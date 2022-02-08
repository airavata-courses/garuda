const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const longRefSchema = new mongoose.Schema({
    parent_doc_ref: ObjectId, 
    long: [],
  });


const LongRefModel  = mongoose.model("LongRefModel", longRefSchema); 
module.exports = LongRefModel