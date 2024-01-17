const fs = require('fs');
const path = require('path');
const fsPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(fsPath, 'utf-8');

stream.on('data', (data) => console.log(data.toString()));
