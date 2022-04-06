const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const merraDataSetModel = new mongoose.Schema({
  _id: ObjectId,
  request_id: String,
  s3_url: String,
});
const MerraDatasetModel = mongoose.model("MerraDataSetModel", merraDataSetModel);

module.exports = MerraDatasetModel