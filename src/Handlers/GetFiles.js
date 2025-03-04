const { fs } = require('fs')
const { path } = require('path')

async function getFiles(dir, extension = ".js") {
    let filesList = [];
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            filesList = filesList.concat(this.getFiles(filePath, extension));
        } else if (file.endsWith(extension)) {
            filesList.push(filePath);
        }
    });
    return filesList;
}

module.exports = { getFiles };