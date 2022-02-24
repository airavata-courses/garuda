const CONSTANTS = require("./constants");
const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(CONSTANTS.CONST_MONGO_DB_SERVER_URL, { useNewUrlParser: true })
    .catch((err) => {
      console.log("error in connecting to database");
    });

  const conn = mongoose.connection;
  conn.on("connected", function () {
    console.log("database is connected successfully");
  });
  conn.on("disconnected", function () {
    console.log("database is disconnected successfully");
  });
  conn.on("error", console.error.bind(console, "connection error:"));
  return conn
}

module.exports = connectDB;
