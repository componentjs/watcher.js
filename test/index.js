
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var watch = require('..');

var resolve = path.resolve;
var root = __dirname + '/fixture';

var options = {
  root: root
};

before(function (done) {
  mkdirp(root + '/lib/reset', done);
});

beforeEach(function (done) {
  setTimeout(done, 10);
});

after(function (done) {
  rimraf(root + '/lib/reset', done);
});

describe('Component Watcher', function () {
  it('should emit "resolve" on initiation', function (done) {
    var watcher = watch(options);

    watcher.on('resolve', function () {
      setImmediate(watcher.close)
      done();
    });
  })

  describe('when component.json is touched', function () {
    it('should emit "resolve"', function (done) {
      var watcher = watch(options);

      watcher.once('resolve', function () {
        watcher.once('resolve', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('styles', fail);

        fs.utimes(resolve(root, 'component.json'), new Date(), new Date());
      })
    })
  })

  describe('when index.js is touched', function () {
    it('should emit "scripts"', function (done) {
      var watcher = watch(options);

      watcher.once('resolve', function () {
        watcher.once('scripts', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('resolve', fail);
        watcher.on('styles', fail);

        fs.utimes(resolve(root, 'index.js'), new Date(), new Date());
      })
    })
  })

  describe('when index.css is touched', function () {
    it('should emit "styles"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('styles', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('resolve', fail);
        watcher.on('scripts', fail);

        fs.utimes(resolve(root, 'index.css'), new Date(), new Date());
      })
    })
  })

  describe('when boot/component.json is touched', function () {
    it('should emit "resolve"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('resolve', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('styles', fail);

        fs.utimes(resolve(root, 'lib/boot/component.json'), new Date(), new Date());
      })
    })
  })

  describe('when boot/index.js is touched', function () {
    it('should emit "scripts"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('scripts', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('styles', fail);
        watcher.on('resolve', fail);

        fs.utimes(resolve(root, 'lib/boot/index.js'), new Date(), new Date());
      })
    })
  })

  describe('when boot/index.css is touched', function () {
    it('should emit "styles"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('styles', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('resolve', fail);

        fs.utimes(resolve(root, 'lib/boot/index.css'), new Date(), new Date());
      })
    })
  })

  describe('when reset/component.json is created', function () {
    it('should emit "resolve"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('resolve', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('styles', fail);

        fs.writeFileSync(resolve(root, 'lib/reset/component.json'), '');
      })
    })
  })

  describe('when reset/index.css is created', function () {
    it('should emit "resolve"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('resolve', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('styles', fail);

        fs.writeFileSync(resolve(root, 'lib/reset/index.css'));
      })
    })
  })

  describe('when reset/component.json is deleted', function () {
    it('should emit "resolve"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('resolve', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('styles', fail);

        fs.unlinkSync(resolve(root, 'lib/reset/component.json'));
      })
    })
  })

  describe('when reset/index.css is deleted', function () {
    it('should emit "resolve"', function (done) {
      var watcher = watch(options)

      watcher.once('resolve', function () {
        watcher.once('resolve', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('scripts', fail);
        watcher.on('styles', fail);

        fs.unlinkSync(resolve(root, 'lib/reset/index.css'));
      })
    })
  })

  describe('when boot/test.js is touched', function () {
    it('should emit "resolve"', function (done) {

      var watcher = watch({
        root: options.root,
        development: true
      })

      watcher.once('resolve', function () {
        watcher.once('scripts', function () {
          setImmediate(watcher.close)
          done();
        })

        watcher.on('resolve', fail);
        watcher.on('styles', fail);

        fs.utimes(resolve(root, 'test.js'), new Date(), new Date());
      })
    })
  })
})

function fail() {
  throw new Error('nope');
}
