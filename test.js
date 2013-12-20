var defer = require('./')
var assert = require('assert')

describe('defer', function () {
  describe('.setImmediate()', function () {
    it('should work', function (done) {
      var value = false
      defer.setImmediate(function* () {
        value = true
      }, done)
      value.should.be.false
    })

    it('should pass context', function (done) {
      var ctx = {}
      defer.setImmediate.call(ctx, function* () {
        assert.equal(this, ctx)
      }, done)
    })

    it('should catch errors', function (done) {
      defer.setImmediate(function* () {
        throw new Error('boom')
      }, function (err) {
        err.message.should.equal('boom')
        done()
      })
    })

    it('should return the immediate id', function (done) {
      var value = false
      var id = defer.setImmediate(function* () {
        value = true
      })
      clearImmediate(id)
      setImmediate(function () {
        setImmediate(function () {
          value.should.be.false
          done()
        })
      })
    })
  })

  describe('.nextTick()', function () {
    it('should work', function (done) {
      var value = false
      defer.nextTick(function* () {
        value = true
      }, done)
      value.should.be.false
    })

    it('should pass context', function (done) {
      var ctx = {}
      defer.nextTick.call(ctx, function* () {
        assert.equal(this, ctx)
      }, done)
    })

    it('should catch errors', function (done) {
      defer.nextTick(function* () {
        throw new Error('boom')
      }, function (err) {
        err.message.should.equal('boom')
        done()
      })
    })
  })

  describe('.setTimeout()', function () {
    it('should work', function (done) {
      var value = false
      defer.setTimeout(function* () {
        value = true
      }, 1, done)
      value.should.be.false
    })

    it('should pass context', function (done) {
      var ctx = {}
      defer.setTimeout.call(ctx, function* () {
        assert.equal(this, ctx)
      }, 1, done)
    })

    it('should catch errors', function (done) {
      defer.setTimeout(function* () {
        throw new Error('boom')
      }, 1, function (err) {
        err.message.should.equal('boom')
        done()
      })
    })

    it('should return the immediate id', function (done) {
      var value = false
      var id = defer.setTimeout(function* () {
        value = true
      }, 1, done)
      clearTimeout(id)
      setImmediate(function () {
        setImmediate(function () {
          value.should.be.false
          done()
        })
      })
    })
  })

  describe('.setInterval()', function () {
    it('should work', function (done) {
      var value = false
      var id = defer.setInterval(function* () {
        clearInterval(id)
        value = true
      }, 1, done)
      value.should.be.false
    })

    it('should pass context', function (done) {
      var ctx = {}
      var id = defer.setInterval.call(ctx, function* () {
        clearInterval(id)
        assert.equal(this, ctx)
      }, 1, done)
    })

    it('should catch errors', function (done) {
      var id = defer.setInterval(function* () {
        clearInterval(id)
        throw new Error('boom')
      }, 1, function (err) {
        err.message.should.equal('boom')
        done()
      })
    })
  })
})