const { info, error } = require('console')

module.exports = class Logger {

  static info(message) {
    info(`[INFO] -> ${message}`)
  }

  static error(message) {
    error(`[ERROR] -> ${message}`)
  }

}