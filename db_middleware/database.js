const CONSTANTS = require("./constants");
const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect('mongodb://' + CONSTANTS.DB_HOSTS + '/' + CONSTANTS.DB_DATABASE +
      '?replicaSet=' + CONSTANTS.DB_REPLICA_SET + '&readPreference=' + CONSTANTS.DB_REPLICA_SET_PREFERENCE, { useNewUrlParser: true })
    .catch((err) => {
      console.log("error in connecting to database : ", err);
      // exit process to retry
      process.exit(1);
    });

  const conn = mongoose.connection;
  conn.on("connected", function () {
    console.log("database is connected successfully");
  });
  conn.on("disconnected", function () {
    console.log("database is disconnected successfully");
  });
  conn.on("error", () => { console.error.bind(console, "connection error:");
});
}

module.exports = connectDB;
