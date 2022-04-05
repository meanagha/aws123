const express = require('express')
const app = express()
const port = 3000
var AWS = require("aws-sdk");

app.get('/', (req, res) => {
  res.send('Hello World!')
})
var meta  = new AWS.MetadataService();

meta.request("http://23.22.188.198/latest/meta-data/", function(err, data){
    console.log(data);
    //res.send(data)
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})