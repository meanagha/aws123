// const express = require('express')
// const app = express()
// const port = 3000
// var AWS = require("aws-sdk");

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

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



// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  InstanceIds: ['i-0b36f38f5c4148eed'],
  DryRun: true
};

if (process.argv[2].toUpperCase() === "ON") {
  console.log(process.argv[2])
  // Call EC2 to start monitoring the selected instances
  ec2.monitorInstances(params, function(err, data) {
    console.log("jj=",err)
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.monitorInstances(params, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.InstanceMonitorings);
          }
      });
    } else {
      console.log("You don't have permission to change instance monitoring.");
    }
  });
} else if (process.argv[2].toUpperCase() === "OFF") {
  // Call EC2 to stop monitoring the selected instances
  ec2.unmonitorInstances(params, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.unmonitorInstances(params, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.InstanceMonitorings);
          }
      });
    } else {
      console.log("You don't have permission to change instance monitoring.");
    }
  });
}
