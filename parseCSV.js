const fs = require('fs');
const csv = require('csv-parser');
const Tree = require('./Tree');
const inputFile='tree_data.csv';

module.exports = parseCSV = (myCache, res) => {
    var tree = new Tree();
    var parser = csv({separator: '\t'})
    
    .on('data', (data) => tree.addNode(data))
    .on('error', (err) => {
        console.error(err.message)
      })
    .on('end', () => {
        myCache.set("tree", tree, 10000);
        res.send(tree);
    });
         
    fs.createReadStream(inputFile).pipe(parser);
}