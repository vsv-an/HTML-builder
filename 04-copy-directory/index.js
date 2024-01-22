const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, 'files');
const destinationPath = path.join(__dirname, 'files-copy');

fs.rm(destinationPath, { recursive: true, force: true }, () => {
  fs.mkdir(destinationPath, { recursive: true }, () => {
    fs.readdir(sourcePath, (err) => {
      if (err) {
        throw err;
      } else {
        fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
          if (err) {
            throw err;
          } else {
            files.forEach((file) => {
              const sourceFile = path.join(sourcePath, file.name);
              const copyFile = path.join(destinationPath, file.name);
              fs.copyFile(sourceFile, copyFile, () => {});
            });
          }
        });
      }
    });
  });
});
