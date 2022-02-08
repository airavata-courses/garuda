const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const latRefSchema = new mongoose.Schema({
    parent_doc_ref: ObjectId, 
    lat: [],
  });


const LatRefModel = mongoose.model("LatRefModel", latRefSchema); 
module.exports = LatRefModel