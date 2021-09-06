const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');
var csv = require('csv-parser');
var async = require('async');
var inputFile='tree_data.csv';

var results=[];

function parseCSV(){
    var parser = csv({separator: '\t'})
    .on('data', (data) => results.push(data))
    .on('error', (err) => {
        console.error(err.message)
      })
    .on('end', () => {
        console.log(results);
    });
         
    fs.createReadStream(inputFile).pipe(parser);
}



app.get('/', (req, res) => {
  parseCSV();
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

