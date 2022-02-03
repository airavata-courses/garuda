const mongoose = require("mongoose");

const dataSetSchema = new mongoose.Schema({
  request_id: String,
  station_name: String,
  station_latitude: String,
  station_longitude: String,
  station_id: String,
  property: String,
  lat: [],
  long: [],
});

const DatasetModel = mongoose.model("DataSetModel", dataSetSchema);

/**
 * Function inserts data in db
 */
function insertDataInDataSetCollection(req, res, next) {

  const dataset = [];
  const raw_data = req.body;

  raw_data.map((raw_string) => {
    let json = JSON.parse(raw_string.replace(/\bNaN\b/g, "null"));
    let dataObj = {
      request_id: "test", // TODO
      station_name: json.stationName,
      station_id: json.stationID,
      station_latitude: json.stationLatitute,
      station_longitude: json.stationLongitude,
      property: json.variable,
      lat: json.latitude,
      long: json.longitude,
    }
    dataset.push(dataObj);
  });

  DatasetModel.insertMany(dataset).then(function () {
    console.log("Insertion successful in dataset collection");
    next();
  }).catch(function (error) {
    console.log("Error during record insertion : " + err);
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
