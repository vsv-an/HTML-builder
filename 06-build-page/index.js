const fs = require('fs');
const path = require('path');
const destinationPath = path.join(__dirname, 'project-dist');
const componentsPath = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');

fs.rm(destinationPath, { recursive: true, force: true }, (err) => {
  if (err) {
    throw err;
  }
  fs.mkdir(destinationPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    } else {
      createHtmlFile();
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
