const path = require('path')
// const yargs = require('yargs')
//
// const args =
//   yargs(process.argv)
//     .alias('d', 'dev')
//     .alias('t', 'test')
//     .argv

const startTime = Date.now()

let resourcePath = path.dirname(path.dirname(__dirname))

const start = require(path.join(resourcePath, 'src', 'main-process', 'start'))
start(resourcePath, startTime)
