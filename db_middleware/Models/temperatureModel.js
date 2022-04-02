const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const temperatureRef = new mongoose.Schema({
    parent_doc_ref: ObjectId, 
    temperature: [],
  });


const TemperatureRefModel = mongoose.model("TemperatureRefModel", temperatureRef); 
module.exports = TemperatureRefModel