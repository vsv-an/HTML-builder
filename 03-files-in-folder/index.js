const fs = require('fs');
const path = require('path');
const fsPath = path.join(__dirname, 'secret-folder');

fs.readdir(fsPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => createFileInfo(file));
});

function createFileInfo(file) {
  fs.stat(path.join(fsPath, `/${file.name}`), (err, stats) => {
    if (err) {
      throw err;
    }
    if (file.isFile()) {
      const fielExt = path.extname(file.name);
      const fileName = path.basename(file.name, fielExt);
      console.log(
        `${fileName} - ${fielExt.replace('.', '')} - ${stats.size / 1000} kb`,
      );
    }
  });
}
