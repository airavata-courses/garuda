const CONSTANTS = require("../constants");
const mongoose = require('mongoose');
const userRequestSchema = new mongoose.Schema({
    user_email: String,
    request_id:String,
    status:String,
    time_stamp:String,
    property:String
});

const userRequestsModel = mongoose.model("UsersRequestModel", userRequestSchema);

function setErrorStatusToUserRequest(req, res, next){
        userRequestsModel.updateOne(
            { request_id: req.body.requestID },
            { status: CONSTANTS.CONST_REQUEST_STATUS_ERROR },
            function (err, docs) {
              if (!err) {
                console.log("Updated error status for requestId " + req.body.requestID)
              } else {
                console.log("Failed to update error status for requestId " + req.body.requestID)
              }
            }
          );
}

module.exports = { userRequestsModel, setErrorStatusToUserRequest };