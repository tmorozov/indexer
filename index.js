const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

const excludeExt = ['.spec.js', '.css', '.scss', '.html']

function containsExtentions (fileName, extList) {
  return extList.filter(ext =>
    fileName.indexOf(ext) === (fileName.length - ext.length)
  ).length > 0
}

function createIndexFile (dir, fileList) {
  const indexContent = fileList
  .filter((fileName) => {
    return fileName !== 'index.js' && !containsExtentions(fileName, excludeExt)
  })
  .map((fileName) => `import '.${path.sep}${fileName}'\n`)
  .join('')

  const ws = fs.createWriteStream(path.join(dir, 'index.js'))
  ws.end(indexContent)
}

function processDir (dirName) {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      console.error('readdir', err)
      return
    }

    createIndexFile(dirName, files)

    files.forEach((file) => {
      walkDir(path.join(dirName, file))
    })
  })
}

function walkDir (dir, onDir = processDir, onFile = (f) => {}) {
  if (!dir || !dir.length) {
    console.error('No directory provided')
    return
  }

// ignore hidden files/directories
  if (dir[0] === '.' && dir !== '.') {
    return
  }

  fs.stat(dir, (err, stats) => {
    if (err) {
      return console.error('stat', err)
    }
    stats.isDirectory() ? onDir(dir) : onFile(dir)
  })
}

walkDir(argv._[0])
