const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

const exludeDir = [
  'bower_components',
  'scss'
]

const excludeExt = [
  'index.html',
  'index-async.html',
  '_test.js',
  '.spec.js',
  '.scss'
]

function endsWith (fileName, extList) {
  return extList.filter(ext => {
    const index = fileName.indexOf(ext)
    return index !== -1 && index === (fileName.length - ext.length)
  }).length > 0
}

function createIndexFile (dir, fileList) {
  const indexContent = fileList
  .filter((fileName) => {
    return fileName !== 'index.js' &&
    !endsWith(fileName, excludeExt) &&
    !endsWith(fileName, exludeDir)
  })
  .map((fileName) => `require('.${path.sep}${fileName}')\n`)
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

  if (endsWith(dir, exludeDir)) {
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
