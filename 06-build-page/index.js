const fs = require('fs');
const path = require('path');
const destinationPath = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');
const stylesPath = path.join(__dirname, 'styles');

fs.rm(destinationPath, { recursive: true, force: true }, (err) => {
  if (err) {
    throw err;
  }
  fs.mkdir(destinationPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    } else {
      createHtmlFile();
      createStyleFile();
      copyAssets('assets');
    }
  });
});

function createHtmlFile() {
  let htmlText = '';
  const readableStream = fs.createReadStream(templateFile);
  readableStream.on('data', (files) => {
    htmlText = files.toString();

    fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach((file) => {
        const extName = path.extname(file.name);
        if (file.isFile() && extName === '.html') {
          fs.readFile(path.join(componentsPath, file.name), (err, data) => {
            if (err) console.log(err);
            htmlText = htmlText.replace(
              `{{${file.name.slice(0, -5)}}}`,
              data.toString(),
            );
            const newHtmlFile = fs.createWriteStream(
              path.join(destinationPath, 'index.html'),
            );
            newHtmlFile.write(htmlText);
          });
        }
      });
    });
  });
}

function createStyleFile() {
  const writableStream = fs.createWriteStream(
    path.join(destinationPath, 'style.css'),
  );

  fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      const fileExt = path.extname(file.name);
      if (file.isFile() && fileExt === '.css') {
        fs.readFile(path.join(stylesPath, file.name), (err, data) => {
          if (err) {
            throw err;
          }
          writableStream.write(`${data}\n`);
        });
      }
    });
  });
}

function copyAssets(dirName, ...dirPath) {
  fs.mkdir(
    path.join(destinationPath, ...dirPath, dirName),
    { recursive: true },
    () => {
      fs.readdir(
        path.join(__dirname, ...dirPath, dirName),
        { withFileTypes: true },
        (err, files) => {
          if (err) {
            throw err;
          }
          files.forEach((file) => {
            if (file.isDirectory()) {
              copyAssets(file.name, ...dirPath, dirName);
            }
            if (file.isFile()) {
              fs.copyFile(
                path.join(__dirname, ...dirPath, dirName, file.name),
                path.join(destinationPath, ...dirPath, dirName, file.name),
                () => {},
              );
            }
          });
        },
      );
    },
  );
}
