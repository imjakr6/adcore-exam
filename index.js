const express = require('express')
const app = express()
const port = 3000

const parseCSV = require("./parseCSV.js")
const Tree = require('./Tree.js')

const tree = new Tree();

app.get('/get_tree', (req, res) => {
  parseCSV(tree, res);
})

app.post('/update_node', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    
    var result = tree.updateNode(id, name);
    res.send(result);
})

app.delete('/delete_node', (req, res) => {
    const id = req.body.id;
    res.send(200);
})

app.post('/create_node', (req, res) => {
    const parent = req.body.parent;
    const node = req.body.node;
    const result = tree.addNewNode(parent, node);
    res.send(result);
})

app.post('/export_csv', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

