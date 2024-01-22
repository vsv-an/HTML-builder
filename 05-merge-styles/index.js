const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, 'styles');
const destinationPath = path.join(__dirname, 'project-dist', 'bundle.css');
const outputFile = fs.createWriteStream(destinationPath);

fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    const pathToFile = path.join(sourcePath, file.name);
    const fileExt = path.extname(file.name);
    if (file.isFile() && fileExt === '.css') {
      fs.readFile(pathToFile, (err, data) => {
        if (err) {
          throw err;
        } else {
          outputFile.write(`${data}\n`);
        }
      });
    }
  });
});
