const fs = require('fs');
const csv = require('csv-parser');
const async = require('async');
const Tree = require('./Tree');
const inputFile='tree_data.csv';

module.exports = function parseCSV(tree, res){
    if(tree.root.children.length != 0){
        tree = new Tree();
    }

    var parser = csv({separator: '\t'})
    .on('data', (data) => tree.addNode(data))
    .on('error', (err) => {
        console.error(err.message)
      })
    .on('end', () => {
        res.send(tree);
    });
         
    fs.createReadStream(inputFile).pipe(parser);
}