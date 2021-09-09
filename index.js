const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const NodeCache = require( "node-cache" );

const parseCSV = require("./parseCSV.js");

const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = process.env.PORT || 5000;
const myCache = new NodeCache();
const options = {
  root: __dirname + '/client/build/',
};

app.use(jsonParser);
app.use(express.static(path.join(__dirname, './client/build' )));

app.get('/reset-tree', (req, res) => {
    parseCSV(myCache, res);
})

app.get('/get_tree', (req, res) => {
    var tree = myCache.get("tree");
    if(tree)
      res.send(tree);
    else
      parseCSV(myCache, res);
})

app.post('/update_node', urlencodedParser, (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const tree = myCache.get("tree");
    const result = tree.updateNode(id, name, myCache);
    res.sendStatus(result);
})

app.post('/delete_node', urlencodedParser, (req, res) => {
    const id = req.body.id;
    const tree = myCache.get("tree");
    const result = tree.deleteNode(id, myCache);
    res.sendStatus(result);
})

app.post('/create_node', urlencodedParser, (req, res) => {
    const parent = req.body.parent;
    const node = req.body.node;
    const tree = myCache.get("tree");
    const result = tree.createNode(parent, node, myCache);
    // TODO: have better check (cannot create node with id 400)
    if(result == 400)
    res.sendStatus(result);
    else
    res.send(result);
})

app.post('/export_csv', (req, res) => {
  // var json = json3.items
  // var fields = Object.keys(json[0])
  // var replacer = function(key, value) { return value === null ? '' : value } 
  // var csv = json.map(function(row){
  //   return fields.map(function(fieldName){
  //     return JSON.stringify(row[fieldName], replacer)
  //   }).join(',')
  // })
  // csv.unshift(fields.join(',')) // add header column
  //  csv = csv.join('\r\n');
  // console.log(csv)
})

app.get('*', (req, res) => {
  res.sendFile("index.html", options ,(err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})