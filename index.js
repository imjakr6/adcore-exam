const express = require('express');
const bodyParser = require('body-parser')

const parseCSV = require("./parseCSV.js");
const Tree = require('./Tree.js');

const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 5000;
const tree = new Tree();

app.use(jsonParser);
app.get('/get_tree', async (req, res) => {
  var newTree = await parseCSV(tree, res);
})

app.post('/update_node', urlencodedParser, (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    
    var result = tree.updateNode(id, name);
    res.sendStatus(result);
})

app.delete('/delete_node',urlencodedParser, (req, res) => {
    const id = req.body.id;
    res.sendStatus(200);
})

app.post('/create_node',urlencodedParser, (req, res) => {
    const parent = req.body.parent;
    const node = req.body.node;
    const result = tree.addNewNode(parent, node);
    // make sure this is sending the status on error
    if(result)
    res.send(result);
})

app.post('/export_csv', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

