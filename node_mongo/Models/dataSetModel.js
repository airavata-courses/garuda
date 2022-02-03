const mongooseConn = require("../database");
const mongoose = require('mongoose');
const dataSetSchema = new mongoose.Schema({
    request_id:String,
    station_name:String,
    date:String,
    start_time:String,
    end_time:String,
    property:String,
    lat:[],
    long:[]
});


module.exports = mongoose.model("DataSetModel", dataSetSchema);