const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const merraDataSetModel = new mongoose.Schema({
  _id: ObjectId,
  request_id: String,
  property: String,
});
const MerraDatasetModel = mongoose.model("MerraDataSetModel", merraDataSetModel);

module.exports = MerraDatasetModel