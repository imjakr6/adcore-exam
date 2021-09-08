const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const parseCSV = require("./parseCSV.js");
const Tree = require('./Tree.js');

const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = process.env.PORT || 5000;
const tree = new Tree();
var newTree;
app.use(jsonParser);

app.use(express.static(path.join(__dirname, 'client/build' )));

app.get("/", (req, res) => {
  res.send("Home Page");
})

app.get('/get_tree', async (req, res) => {
   newTree = parseCSV(tree, res);
})

app.post('/update_node', urlencodedParser, (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    var result = tree.updateNode(id, name);
    res.sendStatus(result);
})

app.post('/delete_node', urlencodedParser, (req, res) => {
    const id = req.body.id;
    const result = tree.deleteNode(id);
    res.sendStatus(result);
})

app.post('/create_node', urlencodedParser, (req, res) => {
    const parent = req.body.parent;
    const node = req.body.node;
    const result = tree.addNewNode(parent, node);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

