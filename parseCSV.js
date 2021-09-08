const fs = require('fs');
const csv = require('csv-parser');
const async = require('async');
const Tree = require('./Tree');
const inputFile='tree_data.csv';

module.exports = parseCSV = async (tree, res) => {
    if(tree.root.children){
        tree = new Tree();
    }

    var parser = csv({separator: '\t'})
    .on('data', (data) => tree.addNode(data))
    .on('error', (err) => {
        console.error(err.message)
      })
    .on('end', () => {
        res.send(tree);
        return tree.root;
    });
         
    fs.createReadStream(inputFile).pipe(parser);
}