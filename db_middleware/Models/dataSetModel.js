const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const LatRefModel = require("./latSetModel")
const LongRefModel = require("./longSetModel")
const ReflectivityRefModel = require("./reflectivitySetModel")
const UserReqModelClass = require("./userRequestModel")
const CONSTANTS = require("../constants");


const dataSetSchema = new mongoose.Schema({
  _id: ObjectId,
  request_id: String,
  station_name: String,
  station_latitude: String,
  station_longitude: String,
  station_id: String,
  start_time: String,
  end_time: String,
  property: String,
  // lat: [],
  // long: [],
  //data: [],
});

const DatasetModel = mongoose.model("DataSetModel", dataSetSchema);

/**
 * Function inserts data in db
 */
/*  For testing
const dummy_json ={
  "request_id": "rishabh_request_id",
  "station_name": "station_name",
  "date": "02/02/2022",
  "start_time": "12:00AM",
  "end_time": "12:30AM",
  "property": "reflectivity",
  "lat": [
      "123123.123",
      "1231234",
      "5675",
      "8767868"
  ],
  "long": [
      "111123123.123",
      "1111231234",
      "115675",
      "11187678618"
  ]
}*/

function insertDataInDataSetCollection(req, res, next) {

  const raw_data = req.body.data;

  let json = JSON.parse(raw_data.replace(/\bNaN\b/g, "null"))
  var objectId = new mongoose.Types.ObjectId();

  let dataSetModelObj = new DatasetModel({
    _id: objectId,
    request_id: req.body.requestID,
    station_name: json.stationName,
    station_id: json.stationID,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    station_latitude: json.stationLatitute,
    station_longitude: json.stationLongitude,
    property: json.variable,
    //lat: json.latitude,
    //long: json.longitude,
  })



  const latRefModelObj = new LatRefModel({
    parent_doc_ref: objectId,
    lat: json.latitude
  })
  const longRefModelObj = new LongRefModel({
    parent_doc_ref: objectId,
    long: json.longitude
  })

  const reflectivityRefModelObj = new ReflectivityRefModel({
    parent_doc_ref: objectId,
    //TODO check this in container
    //data: json[json.variable]
    data: json.Reflectivity
  })
  latRefModelObj.save((err) => {
    if (!err) {
      console.log("Insertion successful in lat model");
      longRefModelObj.save() //Insertion in long model TODO: ask if can add then() here
      reflectivityRefModelObj.save() //insertion in reflectivity model
      dataSetModelObj.save((err) => {
        if (!err) {
          console.log("Insertion successful in dataset model");
          res.locals.IS_INSERT_OPERATION_SUCCESSFUL = true
        } else {
          console.log("Error during record insertion in dataset model: " + err);
          // res.send({ status: "error", message: "Insertion failed" });
          res.locals.IS_INSERT_OPERATION_SUCCESSFUL = false
          res.locals.CONSTANTS.IS_ERROR_API_CALLED = false
        }
        next()
      })
    } else {
      console.log("Error during record insertion in lat model: " + err);
      res.send({ status: "error", message: "Insertion failed in lat model" });
    }
  })
}

/**
 * Function to check status of request
 */
function getDataOfRequestId(req, res, next) {

  DatasetModel.aggregate(
    [{
      $match: {
        request_id: req.body.request_id
      }
    }, {
      $lookup: {
        from: 'latrefmodels',
        localField: '_id',
        foreignField: 'parent_doc_ref',
        as: 'lat'
      }
    }, {
      $lookup: {
        from: 'longrefmodels',
        localField: '_id',
        foreignField: 'parent_doc_ref',
        as: 'long'
      }
    }, {
      $lookup: {
        from: 'reflectivityrefmodels',
        localField: '_id',
        foreignField: 'parent_doc_ref',
        as: 'reflectivity'
      }
    }, {
      $unwind: {
        path: '$lat'
      }
    }, {
      $unwind: {
        path: '$long'
      }
    }, {
      $unwind: {
        path: '$reflectivity'
      }
    }]
  ).then((result) => {
    res.send({
      status: "success",
      message: "Information retrieved",
      "data": result
    })
  })
    .catch((error) => {
      res.send({
        status: "error",
        message: "Information retrieval failed"
      })
      console.log(error);
    });


  // DatasetModel.find(
  //   { request_id: req.body.request_id, property: req.body.property },
  //   (err, data) => {
  //     if (!err) {
  //       res.send({
  //         status: "success",
  //         message: "Information retrieved",
  //         data: data,
  //       });
  //     } else {
  //       res.send({ status: "error", message: "Retrieval failed" });
  //     }
  //   }
  // );
}

module.exports = {
  DatasetModel: mongoose.model("DataSetModel", dataSetSchema),
  insertDataInDataSetCollection,
  getDataOfRequestId,
};
