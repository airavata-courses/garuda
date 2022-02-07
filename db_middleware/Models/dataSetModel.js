const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { exists } = require("./latSetModel");
const LatRefModel = require("./latSetModel")
const LongRefModel = require("./longSetModel")
const ReflectivityRefModel = require("./reflectivitySetModel")
const UserReqModelClass = require("./userRequestModel")

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
function insertDataInDataSetCollection(req, res, next) {

  const raw_data = req.body.data;

  let json = JSON.parse(JSON.stringify(raw_data).replace(/\bNaN\b/g, "null"))
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
          next()
        } else {
          console.log("Error during record insertion in dataset model: " + err);
          res.send({ status: "error", message: "Insertion failed" });
          UserReqModelClass.setErrorStatusToUserRequest(req, res)
        }
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
    console.log(result);
    res.send({
      "data": result
    })
  })
    .catch((error) => {
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
