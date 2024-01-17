const fs = require('fs');
const path = require('path');
const process = require('process');
const fsPath = path.join(__dirname, 'text.txt');
const textFile = fs.createWriteStream(fsPath, 'utf-8');

console.log('Hello! Write text, please...\n');
process.stdin.on('data', (message) => {
  if (message.toString().toLowerCase().trim() === 'exit') {
    console.log('\nGood bye!');
    process.exit();
  }
  textFile.write(message);
});

process.on('SIGINT', () => {
  console.log('\nGood bye!');
  process.exit();
});
