/* eslint-env mocha */

var assert = require('assert')

var util = require('./_util')
var multer = require('../')
var FormData = require('form-data')

describe.only('Stream Storage', function () {
  var upload

  before(function (done) {
    upload = multer({
      storage: multer.streamStorage()
	})
    done()
  })

  it('should process multipart/form-data POST request', function (done) {
    var form = new FormData()
    var parser = upload.single('tiny1')

    form.append('name', 'Multer')
    form.append('tiny1', util.file('tiny1.dat'))

    util.submitForm(parser, form, function (err, req) {
      assert.ifError(err)

      assert.equal(req.body.name, 'Multer')

      assert.equal(req.file.fieldname, 'tiny1')
      assert.equal(req.file.originalname, 'tiny1.dat')
      assert.equal(req.file.size, null)
      assert(req.file.stream)

      var content = ''
      req.file.stream.on('data', function (chunk) {
        console.log('funk');
        content += chunk.toString()
      })
      req.file.stream.on('end', function () {
        assert.equal(content, '<o)))<<')
        done()
      })
      req.file.stream.on('error', function (e) {
        console.log('error', e)
      })
    })

  })

})
