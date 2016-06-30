var through2 = require('through2')

function StreamStorage (opts) {}

StreamStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  cb(null, {
    stream: file.stream.pipe(through2(function (chunk, enc, done) {
      console.log('chunk');
      done(null, chunk)
    }))
  })
}

StreamStorage.prototype._removeFile = function _removeFile (req, file, cb) {
  cb(null)
}

module.exports = function (opts) {
  return new StreamStorage(opts)
}
