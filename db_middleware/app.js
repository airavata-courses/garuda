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
const userRequestsModel = require("./Models/userRequestModel");
const {
  insertDataInDataSetCollection,
  getDataOfRequestId,
} = require("./Models/dataSetModel");
const mongoose = require("mongoose");
const connectDB = require("./database");

const app = express();
const hostname = CONSTANTS.CONST_NODE_JS_HOSTNAME;
const port = CONSTANTS.CONST_NODE_JS_PORT;

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

/**
 * Method to avoid cors error. Set allow origin for all request
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**
 * Section - Api calls from the frontend
 */
/**
 * postCheckRequest api is used to check whether a particular request exists or not
 * requestbody - {
                  “request_id”:“STRING”
                  “property”:"STRING"
                }
 */
app.post("/postCheckRequest", (req, res) => {
  processRequestBody(req).then((data) => {
    receivedData = JSON.parse(data);
    checkIfRequestIdExists(receivedData, res);
  });
});

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
app.post("/postNewRequest", (req, res) => {
  processRequestBody(req).then((data) => {
    receivedData = JSON.parse(data);
    insertUserRequest(receivedData, res, true);
  });
});

/**
 * getAllStatus api is used to get all user requests details
 * by default the 'status' value is 0 (inprocess) but in case request data already exists then its set to 1 (complete)
 * requestbody -  {
                    user_email: “STRING”
                  }
 */
app.post("/getAllStatus", (req, res) => {
  processRequestBody(req).then((data) => {
    receivedData = JSON.parse(data);
    getAllUserRequests(receivedData, res);
  });
});

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

// TODO: make this API HTTP GET
app.post("/getDataOfRequestID", getDataOfRequestId);

/**
 * Section - Api calls from the backend
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
app.post("/data_writer", insertDataInDataSetCollection, updateStatusOfRequestInDB);

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

/**
 * Below code is used to leverage node.js on the client side when not using express
 */
// http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(JSON.stringify({"a":"asd"}));
// });

/**
 * Methods to communicate with the mongodb for FRONTEND
 */
//Rishabh - Another approach to write the below function
// async function checkRequestIdInsertOrReturn() {
//   const ad = 'dummy_request_id'
//   const findResults = await userRequestsModel.find({ request_id: ad });
//   console.log({findResults})
// }
/**
 *
 * @param {*} receivedData
 * @param {*} res
 * @deprecated
 */
function checkRequestIdInsertOrReturn(receivedData, res) {
  const paramRequestId = receivedData.request_id;
  userRequestsModel.find({ request_id: paramRequestId }, (err, data) => {
    if (!err) {
      //data: array of objects
      if (data.length != 0) {
        res.send({
          status: "success",
          message: "Information retrieved",
          requests: data,
          is_new_request: "false",
        });
        //Below code acts as a caching mechanism if the request made by the user already exists in DB but the initial request was made by some other user then insert the same entry with new user's user email
        //TODO: The above fix causes a bug i.e the 'data' variable which is returned has multiple entries of same request and email id of other user is getting exposed
        //solution for it before returning the data add a filter to return only current users request.
        var tempData = data;
        tempData.forEach((jsonDocument) => {
          if (jsonDocument.user_email != receivedData.user_email) {
            jsonDocument.user_email = receivedData.user_email;
            id = mongoose.Types.ObjectId();
            jsonDocument._id = id;
            insertUserRequest(jsonDocument, res, false);
            return;
          } else {
            console.log("nothing");
          }
        });
      } else {
        insertUserRequest(receivedData, res, true);
      }
    } else {
      res.send({ status: "error", message: "Retrieval failed" });
    }
  });
}

function checkIfRequestIdExists(receivedData, res) {
  const paramRequestId = receivedData.request_id;
  const paramPropertyType = receivedData.property;
  userRequestsModel.find(
    { request_id: paramRequestId, property: paramPropertyType },
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
          //Below code acts as a caching mechanism if the request made by the user already exists in DB but the initial request was made by some other user then insert the same entry with new user's user email
          //TODO: The above fix causes a bug i.e the 'data' variable which is returned has multiple entries of same request and email id of other user is getting exposed
          //Update: no need to do it moved that functionality on api gateway
          //solution for it before returning the data add a filter to return only current users request.
          // var tempData = data
          // tempData.forEach(jsonDocument => {
          //   if(jsonDocument.user_email != receivedData.user_email){
          //     jsonDocument.user_email = receivedData.user_email
          //     id = mongoose.Types.ObjectId();
          //     jsonDocument._id = id
          //     insertUserRequest(jsonDocument, res, false)
          //     return;
          //   } else {
          //     console.log("nothing")
          //   }
          // })
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

function insertUserRequest(objUserRequest, response) {
  const paramRequestId = receivedData.request_id;
  const paramPropertyType = receivedData.property;
  const paramUserEmail = receivedData.user_email;
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
            status: CONSTANTS.CONST_REQUEST_STATUS_COMPLETE, //by default the status is 0 - inprocess but in this case data set exists already so it will directly go to complete state
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

function getAllUserRequests(receivedData, res) {
  userRequestsModel.find(
    { user_email: receivedData.user_email },
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

/**
 * Methods to communicate with the mongodb for BACKEND
 */

/*  For testing
const dummy_json ={
  "request_id": "rishabh_request_id",
  "station_name": "station_name",
  "date": "02/02/2022",
  "start_time": "12:00AM",
  "end_time": "12:30AM",
  "property": "reflectivity",
  "lat": [
      "123123.123",
      "1231234",
      "5675",
      "8767868"
  ],
  "long": [
      "111123123.123",
      "1111231234",
      "115675",
      "11187678618"
  ]
}*/

// TODO: complete while integrating API gateway
function updateStatusOfRequestInDB(req, res) {
  res.json({ status: 200 });
  // userRequestsModel.updateOne(
  //   { request_id: oDataSetRequest.request_id },
  //   { status: CONSTANTS.CONST_REQUEST_STATUS_COMPLETE },
  //   function (err, docs) {
  //     if (!err) {
  //       // docs response
  //       // {
  //       //   acknowledged: true,
  //       //   modifiedCount: 1,
  //       //   upsertedId: null,
  //       //   upsertedCount: 0,
  //       //   matchedCount: 1
  //       // }
  //       if (docs.modifiedCount && docs.matchedCount) {
  //         response.send({
  //           status: "success",
  //           message: "Insert and Update successful",
  //         });
  //       } else {
  //         response.send({
  //           status: "error",
  //           message: "Something went wrong during the update operation",
  //         });
  //       }
  //     } else {
  //       response.send({
  //         status: "error",
  //         message: "Update failed in user request collection",
  //       });
  //     }
  //   }
  // );
}

/**
 * Utils Method
 */
/**
 * Get request body of the request and return a string
 */
function processRequestBody(requestObject) {
  return new Promise((resolve, reject) => {
    let data = "";
    requestObject.on("data", (chunk) => {
      data += chunk;
    });
    requestObject.on("end", () => {
      console.log("Received data " + JSON.parse(JSON.stringify(data)));
      resolve(data);
    });
  });
}

/**
 * API for ping check
 */
app.get("/ping", (req, res) => {
  res.json({
    ping: "pokemon",
  });
});

//Method to listen all incoming request
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  connectDB();
});
