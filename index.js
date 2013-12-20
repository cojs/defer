var co = require('co')

exports = module.exports = deferImmediate
exports.defer =
exports.immediate =
exports.setImmediate = deferImmediate

function deferImmediate(gen, cb) {
  return setImmediate(co(gen).bind(this, cb || error))
}

exports.nextTick = function deferNextTick(gen, cb) {
  return process.nextTick(co(gen).bind(this, cb || error))
}

exports.timeout =
exports.setTimeout = function deferTimeout(gen, timeout, cb) {
  return setTimeout(co(gen).bind(this, cb || error), timeout)
}

exports.interval =
exports.setInterval = function deferInterval(gen, timeout, cb) {
  return setInterval(co(gen).bind(this, cb || error), timeout)
}

function error(err) {
  if (err) throw err
}