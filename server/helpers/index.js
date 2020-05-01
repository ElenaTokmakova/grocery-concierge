const fs = require("fs");
const path = require('path');

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync((path.resolve(__dirname, filepath)), encoding);
    return JSON.parse(file);
}

exports.readJsonFileSync = readJsonFileSync;