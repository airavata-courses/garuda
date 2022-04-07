const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const CONSTANTS = require("../constants");
const LatRefModel = require("./latSetModel")
const LongRefModel = require("./longSetModel")
const ReflectivityRefModel = require("./reflectivitySetModel")
const UserReqModelClass = require("./userRequestModel")
const AwsObjectStore = require("../utils/objectStore.js")
const MerraDataSetModel = require("./merraDataSetModel")
const TemperatureRefModel = require("./temperatureModel")

const dataSetSchema = new mongoose.Schema({
  _id: ObjectId,
  request_id: String,
  s3_url: String
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

async function insertDataInDataSetCollection(req, res, next) {
  const data_set_type = req.body.type || CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD;

  // TODO: NASA data handling
  // can check if nasa data nasa data via req.body.type = nasa

  const raw_data = req.body.data;
  //Rishabh: When calling this API from postman comment the 1st line and uncomment the 2nd line
  //1st line
  let json = raw_data;

  if (data_set_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
    json = JSON.parse(raw_data.replace(/\bNaN\b/g, "null"));
  }
  //2nd line
  //let json = raw_data
  var objectId = new mongoose.Types.ObjectId();


  if (data_set_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
    //Nexrad dataset
    const url = await AwsObjectStore.upload_object_store(req.body.requestID + ".json", JSON.stringify(json));
    let dataSetModelObj = new DatasetModel({
      _id: objectId,
      request_id: req.body.requestID,
      s3_url: CONSTANTS.END_POINT + CONSTANTS.BUCKET_NAME + "/" + req.body.requestID + ".json"
    })
    dataSetModelObj.save((err) => {
      if (!err) {
        res.locals.IS_INSERT_OPERATION_SUCCESSFUL = true
        console.log("Insertion successful in dataSet model");
        next()
      } else {
        res.locals.IS_INSERT_OPERATION_SUCCESSFUL = false
        res.locals.IS_ERROR_API_CALLED = false
        res.send({ status: "error", message: "Insertion failed in dataSet model" });
      }
    });

  } else {
    //New merra data set
    const url = await AwsObjectStore.upload_object_store(req.body.requestID + ".json", JSON.stringify(json));
    let merraDataSetModel = new MerraDataSetModel({
      _id: objectId,
      request_id: req.body.requestID,
      s3_url: CONSTANTS.END_POINT + CONSTANTS.BUCKET_NAME + "/" + req.body.requestID + ".json"
    })
    merraDataSetModel.save((err) => {
      if (!err) {
        res.locals.IS_INSERT_OPERATION_SUCCESSFUL = true
        console.log("Insertion successful in merra dataset  model");
        next()
      } else {
        res.locals.IS_INSERT_OPERATION_SUCCESSFUL = false
        res.locals.IS_ERROR_API_CALLED = false
        res.send({ status: "error", message: "Insertion failed in merra dataSet model" });
      }
    });
  }
}

/**
 * Function to check status of request
 */
function getDataOfRequestId(req, res, next) {

  // type check
  request_params = req.body.request_id.split("_");
  data_type = request_params[request_params.length - 1];

  if (data_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
    DatasetModel.find({ "request_id": req.body.request_id }, function (err, docs) {
      if (!err) {
        res.send({
          status: "success",
          message: "Information retrieved",
          "data": docs
        })
      } else {
        res.send({
          status: "error",
          message: "Information retrieval failed"
        })
        console.log(error, "nexrad dataset");
      }
    })
  } else {
    MerraDataSetModel.find({ "request_id": req.body.request_id }, function (err, docs) {
      if (!err) {
        res.send({
          status: "success",
          message: "Information retrieved from merra",
          "data": docs
        })
      } else {
        res.send({
          status: "error",
          message: "Information retrieval failed"
        })
        console.log(error, "merra dataset");
      }
    })
  }
}

module.exports = {
  DatasetModel: mongoose.model("DataSetModel", dataSetSchema),
  insertDataInDataSetCollection,
  getDataOfRequestId,
};
