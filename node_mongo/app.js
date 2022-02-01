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

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const app = express()
const hostname = '127.0.0.1';
const port = 3001;
const url = 'mongodb://127.0.0.1:27017/game-of-thrones'

function connectToMongoDb() {
  console.log("method called")
  mongoose.connect(url, { useNewUrlParser: true })
  const db = mongoose.connection
  db.once('open', _ => {
    console.log('Database connected:', url)
  })

  db.on('error', err => {
    console.error('connection error:', err)
  })
}


app.use(
  express.urlencoded({
    //extended true/false
    //true - it uses qs library to serialize the data (Recommended)
    //false - querystring library to serialize the data
    extended: true
  })
)
app.use(express.json())

app.get('/', function (req, res) {
  res.send('<b>My</b> first express http server');
  //connectToMongoDb()
});

app.post('/nodePostRequestData', (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.send({ express: 'Hello From Express' });
})




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


/**
 * Below code is used o leverage node.js on the client side when not using express
 */
// http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(JSON.stringify({"a":"asd"}));
// });