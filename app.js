const csvjson = require('csvjson');
const fs = require('fs');

const stream = require('stream');
const JSONStream = require('jsonstream');

const createReadStream = fs.createReadStream;
const createWriteStream = fs.createWriteStream;

let words = 0;
const transformJsonToCSV = new stream.Transform({
    transform: function transformer(chunk, encoding, callback) {
        words++;
        callback(false, csvjson.toCSV(chunk, {
            headers: words > 1 ? 'none' : Object.keys(JSON.parse)
        }));
    },
    readableObjectMode: true,
    writableObjectMode: true,
});

createReadStream('./iop.json', 'utf-8')
    .pipe(JSONStream.parse('*'))
    .pipe(transformJsonToCSV)
    .pipe(createWriteStream('./iopcsv.csv'));


    
    