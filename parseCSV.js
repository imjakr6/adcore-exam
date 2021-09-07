const Tree = require("./Tree.js");

const fs = require('fs');
const csv = require('csv-parser');
const async = require('async');
const inputFile='tree_data.csv';
var bool = onlyRunOnce = false;

module.exports = function parseCSV(tree, res){
    // Improove this
    if(onlyRunOnce)
        return;

    var parser = csv({separator: '\t'})
    .on('data', (data) => tree.addNode(data))
    .on('error', (err) => {
        console.error(err.message)
      })
    .on('end', () => {
        onlyRunOnce = true;
        res.send(tree);
    });
         
    fs.createReadStream(inputFile).pipe(parser);
}