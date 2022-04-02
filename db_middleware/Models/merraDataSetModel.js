const mongoose = require("mongoose");

const merraDataSetModel = new mongoose.Schema({
    _id: ObjectId,
    request_id: String,
    min_lon: String,
    max_lon: String,
    min_lat: String,
    max_lat: String,
    start_time: String,
    end_time: String,
    beg_hour: String,
    end_hour: String,
    property: String
    // lat: [],
    // long: [],
    //data: [],
  });
  const MerraDatasetModel = mongoose.model("MerraDataSetModel", merraDataSetModel);

module.exports = {
    MerraDatasetModel
  }