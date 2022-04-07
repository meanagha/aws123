const express = require('express')
const app = express()
const port = 3000
var AWS = require("aws-sdk");
// Set the region 
AWS.config.update({region: 'us-east-1'});
var meta  = new AWS.MetadataService();

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  DryRun: false
};
app.get('/', (req, res) => {
 
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log("Error", err.stack);
    } else {
      //console.log("Success", JSON.stringify(data.InstanceId));
      meta.request("/latest/meta-data/instance-id", function(err, data){
        console.log(data);
      });
      res.send('Hello World!')
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'us-east-1'});

// // Create EC2 service object
// var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// var params = {
//   DryRun: false
// };

// // Call EC2 to retrieve policy for selected bucket
// ec2.describeInstances(params, function(err, data) {
//   if (err) {
//     console.log("Error", err.stack);
//   } else {
//     console.log("Success", JSON.stringify(data));
//   }
// });
