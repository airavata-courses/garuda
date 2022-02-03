const mongoose = require('mongoose');
const userRequestSchema = new mongoose.Schema({
    user_email: String,
    request_id:String,
    status:String,
    time_stamp:String,
    property:String
});


module.exports = mongoose.model("UsersRequestModel", userRequestSchema);
//module.exports = { userRequestsModel }