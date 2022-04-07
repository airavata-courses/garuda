var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east' });
const CONSTANTS = require("../constants");

/**
 * Function to upload data on object store
 * @param {String} file_name 
 * @param {String} file_data 
 * @param {String} file_content_type 
 */
async function upload_object_store(file_name, file_data, file_content_type = 'application/json') {
  var s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(CONSTANTS.END_POINT),
    s3ForcePathStyle: true,
    region: "us-east"
  })

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: CONSTANTS.BUCKET_NAME, Key: file_name, Body: file_data,
    ContentType: file_content_type
  };

  // call S3 to retrieve upload file to specified bucket
  try {
    const object = await s3.upload(uploadParams).promise()
    return object.Location;
  } catch (err) {
    throw err;
  }
}

// example invokation
// upload_object_store("pranav.json", '{"name":"pranav"}', 'application/json')
//   .then((url) => {
//     console.log(url)
//   })
//   .catch((err) => {
//     console.log("error in uploading file to object store:  \n", err);
//   })

module.exports = {
  upload_object_store
}