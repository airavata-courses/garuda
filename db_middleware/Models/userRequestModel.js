const CONSTANTS = require("../constants");
const mongoose = require('mongoose');
const userRequestSchema = new mongoose.Schema({
  user_email: String,
  request_id: String,
  status: String,
  time_stamp: String,
  property: String
});

const userRequestsModel = mongoose.model("UsersRequestModel", userRequestSchema);


/**
 * postCheckRequest api is used to check whether a particular request exists or not
 * requestbody - {
                  “request_id”:“STRING”
                }
 */
function checkIfRequestIdExists(req, res) {
  const paramRequestId = req.body.request_id;
  userRequestsModel.find(
    { request_id: paramRequestId },
    (err, data) => {
      if (!err) {
        //data: array of objects
        if (data.length != 0) {
          res.send({
            status: "success",
            message: "Information retrieved",
            requests: data,
            data_status: "true",
          });
        } else {
          res.send({
            status: "success",
            message: "Information not present",
            data_status: "false",
          });
        }
      } else {
        res.send({
          status: "error",
          message: "Retrieval failed",
          data_status: "false",
        });
      }
    }
  );
}

function insertUserRequest(req, response, next) {
  const objUserRequest = req.body
  const paramRequestId = objUserRequest.request_id;
  const paramPropertyType = objUserRequest.property;
  const paramUserEmail = objUserRequest.user_email;
  userRequestsModel.find(
    {
      request_id: paramRequestId,
      property: paramPropertyType,
      user_email: paramUserEmail,
    },
    (err, data) => {
      if (!err) {
        if (data.length == 0) {
          //New Request from different USER but data already exists
          var oUserReq = new userRequestsModel({
            user_email: paramUserEmail,
            request_id: paramRequestId,
            status: CONSTANTS.CONST_REQUEST_STATUS_IN_PROCESS, //by default the status is 0 - inprocess but in this case data set exists already so it will directly go to complete state
            time_stamp: objUserRequest.time_stamp,
            property: paramPropertyType,
          });
          //Data for testing purpose
          // var oUserReq = new userRequestsModel({
          //   user_email: 'dummy',
          //   request_id:'dummy_request_id',
          //   status:CONSTANTS.CONST_REQUEST_STATUS_IN_PROCESS,
          //   time_stamp:'dummy_time_stamp',
          //   property:'reflectivity'
          // })
          oUserReq.save((err) => {
            if (!err) {
              console.log("Insertion successful");
              response.send({
                status: "success",
                message: "Insertion successful",
              });
            } else {
              response.send({ status: "error", message: "Insertion failed" });
              console.log("Error during record insertion : " + err);
            }
          });
        } else {
          response.send({
            status: "success",
            message: "Request already exists"
          });
        }
      } else {
        response.send({ status: "error", message: "Insertion failed" });
        console.log("Error during record insertion : " + err);
      }
    }
  );
}

function getAllUserRequests(req, res, next) {
  userRequestsModel.find(
    { user_email: req.body.user_email },
    (err, data) => {
      if (!err) {
        //data: array of objects
        res.send({
          status: "success",
          message: "Information retrieved",
          requests: data,
        });
      } else {
        res.send({ status: "error", message: "Retrieval failed" });
      }
    }
  );
}



function setCompleteStatusToUserRequest(req, res, next) {
  //res.json({ status: 200 });
  userRequestsModel.updateOne(
    { request_id: req.body.requestID },
    { status: CONSTANTS.CONST_REQUEST_STATUS_COMPLETE },
    function (err, docs) {
      if (!err) {
        // docs response
        // {
        //   acknowledged: true,
        //   modifiedCount: 1,
        //   upsertedId: null,
        //   upsertedCount: 0,
        //   matchedCount: 1
        // }
        res.send({
          status: "success",
          message: "Insert and Update successful",
        });
      } else {
        res.send({
          status: "error",
          message: "Update failed in user request collection",
        });
      }
    }
  );
}

function setErrorStatusToUserRequest(req, res, next) {
  userRequestsModel.updateOne(
    { request_id: req.body.requestID },
    { status: CONSTANTS.CONST_REQUEST_STATUS_ERROR },
    function (err, docs) {
      if (!err) {
        if (res.locals.IS_ERROR_API_CALLED) {
          //Executed when the error status api is called  
          res.send({
            status: "success",
            message: "Updated error status successfully" + req.body.requestID,
          });
        } else {
          //Giving error message to queue_worker that data insertion to dataSetObject wasn't successful after updating the requestID status in userDetailsModel
          res.send({ status: "error", message: "Insertion failed" });
        }
        console.log("Updated error status for requestId " + req.body.requestID)
      } else {
        res.send({
          status: "error",
          message: "Failed to update error status for requestId " + req.body.requestID,
        });
        console.log("Failed to update error status for requestId " + req.body.requestID)
      }
    }
  );
}

function updateUserRequestStatusInDb(req, res, next) {
  if(res.locals.IS_INSERT_OPERATION_SUCCESSFUL) {
    //success - executed when insertion to dataSet model is successful and need to update requestID status to complete in userDetailsModel
    console.log("INSIDE IF " + res.locals.IS_INSERT_OPERATION_SUCCESSFUL + " asdasdasd")
    setCompleteStatusToUserRequest(req, res, next)
  } else {
    //error - executed in 2 cases - 1. error during insertion to dataSetModel 2. When the api is called specially by queue_worker to indicate that the data for a specific request id doesn't exists on nexard database
    console.log("INSIDE ELSE" + res.locals.IS_ERROR_API_CALLED + " asdasdasd")
    setErrorStatusToUserRequest(req, res, next)
  }

}

module.exports = { userRequestsModel, checkIfRequestIdExists, insertUserRequest, getAllUserRequests, updateUserRequestStatusInDb };