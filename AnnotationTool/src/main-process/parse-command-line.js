const path = require('path')

module.exports = function parseCommandLine (processArgs) {

  resourcePath = path.dirname(path.dirname(__dirname))

  return { resourcePath }
}
