/**additional package installed 'express'
'nodemon' for automatic refresh
'mongodb' to install MongoDB Node.js Driver 
'mangoose' library to communicate to mongodb from nodejs
'brew install mongodb-community' to install mongodb in the local machine
  - to start mongo db service 'brew services start mongodb/brew/mongodb-community'

  to start the server
  node app.js OR nodemon app.js

  to start mongodb 
  run 'mongo' command
*/
const CONSTANTS = require("./constants");
const express = require("express");
const objUserRequestsModel = require("./Models/userRequestModel");
const objDataSetModel = require("./Models/dataSetModel");
const mongoose = require("mongoose");
const connectDB = require("./database");
const morgan = require('morgan')

const app = express();

app.use(
  express.urlencoded({
    //extended true/false
    //true - it uses qs library to serialize the data (Recommended)
    //false - querystring library to serialize the data
    extended: true,
    limit: "250mb"
  })
);
app.use(express.json({ limit: "250mb" }));
app.use(morgan('combined'))

/**
 * Method to avoid cors error. Set allow origin for all request
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**
 * Section - Api calls from the FRONTEND
 */
/**
 * postCheckRequest api is used to check whether a particular request exists or not
 * requestbody - {
                  “request_id”:“STRING”
                  “property”:"STRING"
                }
 */
app.post("/postCheckRequest", objUserRequestsModel.checkIfRequestIdExists);

/**
 * postNewRequest api is used to insert new user request
 * by default the 'status' value is 0 (inprocess) but in case request data already exists then its set to 1 (complete)
 * requestbody - {
                  user_email: “STRING”
                  request_id: “STRING”
                  time_stamp: “STRING”
                  property: “STRING”
              }
 */
app.post("/postNewRequest", objUserRequestsModel.insertUserRequest);

/**
 * getAllStatus api is used to get all user requests details
 * by default the 'status' value is 0 (inprocess) but in case request data already exists then its set to 1 (complete)
 * requestbody -  {
                    user_email: “STRING”
                  }
 */
app.post("/getAllStatus", objUserRequestsModel.getAllUserRequests);

/**
 * getDataOfRequestID api is used to get all detailed information about the particular user request
 * by default the 'status' value is 0 (inprocess) but in case request data already exists then its set to 1 (complete)
 * requestbody -  
          {
          “user_email” : “string”,
          “request_id” : “string”,
          “property” : “string”
          }
 */

app.post("/getDataOfRequestID", objDataSetModel.getDataOfRequestId);



/**
 * Section - Api calls from the BACKEND
 */

/**
 * data_writer api is consumed by the QUEUE WORKER service
 * 
 * requestbody -  
          { 
            request_id: ,
            station_name: ,
            date: MM-DD_YYYY,
            start_time: ,
            end_time: ,
            property: ,
            lat: [],
            long: []
          }
 */
app.post("/data_writer", objDataSetModel.insertDataInDataSetCollection, objUserRequestsModel.updateUserRequestStatusInDb);

app.get("/updateErrorStatusReqId", (req, res, next) => {
  res.locals.IS_ERROR_API_CALLED = true
  objUserRequestsModel.updateUserRequestStatusInDb(req, res, next)
})
/**
 * API for ping check
 */
app.get("/ping", (req, res) => {
  res.json({
    ping: "pokemon",
    type: CONSTANTS.APP_TYPE
  });
});

//Method to listen all incoming request
const server = app.listen(CONSTANTS.APP_PORT, () => {
  console.log(`Server of type: ${CONSTANTS.APP_TYPE} running at port ${CONSTANTS.APP_PORT}`);
  if (process.env.NODE_ENV != 'test') {
    connectDB();
  }
});


module.exports = { app, server };

//Test endpoint
// app.get('/', function (req, res) {
//   dummy = {
//     "request_id":"rishabh_request_id",
//     "property":"reflectivity",
//     "user_email":"dummmmmmmm"
//   }
//   getDataOfRequestId(dummy, res)
// //res.send({ express: 'Hello From Express' });
// });
