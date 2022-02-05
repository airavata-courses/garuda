const mongoose = require("mongoose");

const dataSetSchema = new mongoose.Schema({
  request_id: String,
  station_name: String,
  station_latitude: String,
  station_longitude: String,
  station_id: String,
  start_time: String,
  end_time: String,
  property: String,
  data: [],
  lat: [],
  long: [],
});

const DatasetModel = mongoose.model("DataSetModel", dataSetSchema);

/**
 * Function inserts data in db
 */
function insertDataInDataSetCollection(req, res, next) {

  const dataset = [];
  const raw_data = req.body.data;

  let json = JSON.parse(raw_data.replace(/\bNaN\b/g, "null"));
  let dataObj = {
    request_id: req.body.requestID,
    station_name: json.stationName,
    station_id: json.stationID,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    station_latitude: json.stationLatitute,
    station_longitude: json.stationLongitude,
    property: json.variable,
    lat: json.latitude,
    long: json.longitude,
    data: json[json.variable]
  }
  dataset.push(dataObj);

  DatasetModel.insertMany(dataset)
    .then(function () {
      console.log("Insertion successful in dataset collection");
      next();
    }).catch(function (error) {
      console.log("Error during record insertion : " + error);
      res.send({ status: "error", message: "Insertion failed" });
    });
}

/**
 * Function to check status of request
 */
function getDataOfRequestId(req, res, next) {
  DatasetModel.find(
    { request_id: req.body.request_id, property: req.body.property },
    (err, data) => {
      if (!err) {
        res.send({
          status: "success",
          message: "Information retrieved",
          data: data,
        });
      } else {
        res.send({ status: "error", message: "Retrieval failed" });
      }
    }
  );
}

module.exports = {
  DatasetModel: mongoose.model("DataSetModel", dataSetSchema),
  insertDataInDataSetCollection,
  getDataOfRequestId,
};
