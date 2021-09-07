const express = require('express')
const app = express()
const port = 3000

const fs = require('fs');
const csv = require('csv-parser');
const async = require('async');
const inputFile='tree_data.csv';


var nodes=[{
    id: 0,
    name: "root"
}];


function parseCSV(){
    var parser = csv({separator: '\t'})
    .on('data', (data) => nodes.push(data))
    .on('error', (err) => {
        console.error(err.message)
      })
    .on('end', () => {
        console.log(nodes);
    });
         
    fs.createReadStream(inputFile).pipe(parser);
}


app.get('/get_tree', (req, res) => {
  parseCSV();
  res.send(nodes);
})

app.post('/update_node', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    res.send(200);
})

app.delete('/delete_node', (req, res) => {
    const id = req.body.id;
    res.send(200);
})

app.post('/create_node', (req, res) => {
    const parent = req.body.parent;
    const node = req.body.node;
    const tempID = 0;
    res.send(tempID);
})

app.post('/export_csv', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

