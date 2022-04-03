const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const CONSTANTS = require("../constants");
const LatRefModel = require("./latSetModel")
const LongRefModel = require("./longSetModel")
const ReflectivityRefModel = require("./reflectivitySetModel")
const MerraDataSetModel = require("./merraDataSetModel")
const TemperatureRefModel = require("./temperatureModel")

const dataSetSchema = new mongoose.Schema({
  _id: ObjectId,
  request_id: String,
  station_name: String,
  station_latitude: String,
  station_longitude: String,
  station_id: String,
  start_time: String,
  end_time: String,
  property: String,
  // lat: [],
  // long: [],
  //data: [],
});

const DatasetModel = mongoose.model("DataSetModel", dataSetSchema);

/**
 * Function inserts data in db
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

async function insertDataInDataSetCollection(req, res, next) {
  const data_set_type = req.body.type || CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD;

  // TODO: NASA data handling
  // can check if nasa data nasa data via req.body.type = nasa

  const raw_data = req.body.data;
  //Rishabh: When calling this API from postman comment the 1st line and uncomment the 2nd line
  //1st line
  let json = raw_data;

  if (data_set_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
    json = JSON.parse(raw_data.replace(/\bNaN\b/g, "null"));
  }
  //2nd line
  //let json = raw_data
  var objectId = new mongoose.Types.ObjectId();


  let dataSetModelObj;
  let reflectivityRefModelObj;
  let merraDataSetModel;
  let longRefModelObj;
  let latRefModelObj;
  let temperatureRefModelObj;
  if (data_set_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
    //Nexrad dataset

    dataSetModelObj = new DatasetModel({
      _id: objectId,
      request_id: req.body.requestID,
      station_name: json.stationName,
      station_id: json.stationID,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      station_latitude: json.stationLatitute,
      station_longitude: json.stationLongitude,
      property: json.variable
    });

    reflectivityRefModelObj = new ReflectivityRefModel({
      parent_doc_ref: objectId,
      //TODO check this in container
      //data: json[json.variable]
      data: json.Reflectivity.filter((number, index) => index % 4 == 0),
    });

    latRefModelObj = new LatRefModel({
      parent_doc_ref: objectId,
      lat: json.latitude.filter((number, index) => index % 4 == 0),
    });

    longRefModelObj = new LongRefModel({
      parent_doc_ref: objectId,
      long: json.longitude.filter((number, index) => index % 4 == 0),
    });
  } else {
    //New merra data set
    merraDataSetModel = new MerraDataSetModel({
      _id: objectId,
      request_id: req.body.requestID,
      // lat: json.lat,
      // lng: json.lng,
      // temperature: json.T,
      property: json.property || "T"
    });

    latRefModelObj = new LatRefModel({
      parent_doc_ref: objectId,
      lat: json.lat.filter((number, index) => index % 4 == 0),
    });

    longRefModelObj = new LongRefModel({
      parent_doc_ref: objectId,
      long: json.lng.filter((number, index) => index % 4 == 0),
    });
    temperatureRefModelObj = new TemperatureRefModel({
      parent_doc_ref: objectId,
      temperature: json.T.filter((number, index) => index % 4 == 0),
    });


  }

  //Rishabh: transaction method won't work if replica of mongodb is not running
  //To start replica on local environment or in docker check 'stepsToStartReplicaDb.txt' file in db_middleware folder
  //We can also do this with custom connection in order to run write operation on another connection object
  //Ref - https://mongoosejs.com/docs/transactions.html
  const session = await mongoose.startSession();
  await session
    .withTransaction(async (session) => {
      await latRefModelObj.save({ session });
      await longRefModelObj.save({ session });
      if (data_set_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
        await reflectivityRefModelObj.save({ session });
        await dataSetModelObj.save({ session });
      } else {
        await temperatureRefModelObj.save({ session })
        await merraDataSetModel.save({ session });
      }
      res.locals.IS_INSERT_OPERATION_SUCCESSFUL = true;
    })
    .catch((err) => {
      console.log("Error during record insertion data_writer_api: " + err);
      res.locals.IS_INSERT_OPERATION_SUCCESSFUL = false;
      res.locals.IS_ERROR_API_CALLED = false;
      res.send({ status: "error", message: "Insertion failed in lat model" });
    });

  next();

  /* latRefModelObj.save((err) => {
    if (!err) {
      console.log("Insertion successful in lat model");
      longRefModelObj.save() //Insertion in long model TODO: ask if can add then() here
      reflectivityRefModelObj.save() //insertion in reflectivity model
      dataSetModelObj.save((err) => {
        if (!err) {
          console.log("Insertion successful in dataset model");
          res.locals.IS_INSERT_OPERATION_SUCCESSFUL = true
        } else {
          console.log("Error during record insertion in dataset model: " + err);
          // res.send({ status: "error", message: "Insertion failed" });
          res.locals.IS_INSERT_OPERATION_SUCCESSFUL = false
          res.locals.CONSTANTS.IS_ERROR_API_CALLED = false
        }
        next()
      })
    } else {
      console.log("Error during record insertion in lat model: " + err);
      res.send({ status: "error", message: "Insertion failed in lat model" });
    }
  }) */
}

/**
 * Function to check status of request
 */
function getDataOfRequestId(req, res, next) {
  // type check
  request_params = req.body.request_id.split("_");
  data_type = request_params[request_params.length - 1];

  if (data_type === CONSTANTS.CONST_DATA_SET_TYPE_NEXRAD) {
    DatasetModel.aggregate([
      {
        $match: {
          request_id: req.body.request_id,
        },
      },
      {
        $lookup: {
          from: "latrefmodels",
          localField: "_id",
          foreignField: "parent_doc_ref",
          as: "lat",
        },
      },
      {
        $lookup: {
          from: "longrefmodels",
          localField: "_id",
          foreignField: "parent_doc_ref",
          as: "long",
        },
      },
      {
        $lookup: {
          from: "reflectivityrefmodels",
          localField: "_id",
          foreignField: "parent_doc_ref",
          as: "reflectivity",
        },
      },
      {
        $unwind: {
          path: "$lat",
        },
      },
      {
        $unwind: {
          path: "$long",
        },
      },
      {
        $unwind: {
          path: "$reflectivity",
        },
      },
    ])
      .then((result) => {
        res.send({
          status: "success",
          message: "Information retrieved",
          data: result,
        });
      })
      .catch((error) => {
        res.send({
          status: "error",
          message: "Information retrieval failed",
        });
        console.log(error);
      });
  } else {
    MerraDataSetModel.aggregate([
      {
        $match: {
          request_id: req.body.request_id,
        },
      },
      {
        $lookup: {
          from: "latrefmodels",
          localField: "_id",
          foreignField: "parent_doc_ref",
          as: "lat",
        },
      },
      {
        $lookup: {
          from: "longrefmodels",
          localField: "_id",
          foreignField: "parent_doc_ref",
          as: "long",
        },
      },
      {
        $lookup: {
          from: "temperaturerefmodels",
          localField: "_id",
          foreignField: "parent_doc_ref",
          as: "temperature",
        },
      },
      {
        $unwind: {
          path: "$lat",
        },
      },
      {
        $unwind: {
          path: "$long",
        },
      },
      {
        $unwind: {
          path: "$temperature",
        },
      },
    ])
      .then((result) => {
        res.send({
          status: "success",
          message: "Information retrieved",
          data: result,
        });
      })
      .catch((error) => {
        res.send({
          status: "error",
          message: "Information retrieval failed",
        });
        console.log(error);
      });
  }





  // DatasetModel.find(
  //   { request_id: req.body.request_id, property: req.body.property },
  //   (err, data) => {
  //     if (!err) {
  //       res.send({
  //         status: "success",
  //         message: "Information retrieved",
  //         data: data,
  //       });
  //     } else {
  //       res.send({ status: "error", message: "Retrieval failed" });
  //     }
  //   }
  // );
}

module.exports = {
  DatasetModel: mongoose.model("DataSetModel", dataSetSchema),
  insertDataInDataSetCollection,
  getDataOfRequestId,
};
