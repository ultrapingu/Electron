const path = require('path')
const parseCommandLine = require('./parse-command-line')

module.exports = function start (resourcePath, startTime) {

  global.shellStartTime = startTime

  process.on('uncaughtException', function (error = {}) {

    if (error.message != null) {

      console.log(error.message)
    }

    if (error.stack != null) {

      console.log(error.stack)
    }
  })

  process.on('unhandledRejection', function (error = {}) {

    if (error.message != null) {

      console.log(error.message)
    }

    if (error.stack != null) {

      console.log(error.stack)
    }
  })

  const args = parseCommandLine(process.argv.slice(1))

  const TacitrApp = require(path.join(args.resourcePath, 'src', 'main-process', 'tacitr-app'))
  TacitrApp.open(args)
}
