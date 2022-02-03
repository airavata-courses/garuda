const mongoose = require("mongoose");

const dataSetSchema = new mongoose.Schema({
  request_id: String,
  station_name: String,
  date: String,
  start_time: String,
  end_time: String,
  property: String,
  lat: [],
  long: [],
});

const DatasetModel = mongoose.model("DataSetModel", dataSetSchema);

/**
 * Function inserts data in db
 */
function insertDataInDataSetCollection(req, res, next) {
  oDataSetRequest = req.body;
  var oDataSet = new DatasetModel({
    request_id: oDataSetRequest.request_id,
    station_name: oDataSetRequest.station_name,
    date: oDataSetRequest.date,
    start_time: oDataSetRequest.start_time,
    end_time: oDataSetRequest.end_time,
    property: oDataSetRequest.property,
    lat: oDataSetRequest.lat,
    long: oDataSetRequest.long,
  });

  oDataSet.save((err) => {
    if (!err) {
      console.log("Insertion successful in dataset collection");
      next();
    } else {
      console.log("Error during record insertion : " + err);
      res.send({ status: "error", message: "Insertion failed" });
    }
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
