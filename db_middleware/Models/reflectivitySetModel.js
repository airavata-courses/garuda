const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const reflectivityRefSchema = new mongoose.Schema({
    parent_doc_ref: ObjectId, 
    data: [],
  });


const ReflectivityRefModel = mongoose.model("ReflectivityRefModel", reflectivityRefSchema); 
module.exports = ReflectivityRefModel