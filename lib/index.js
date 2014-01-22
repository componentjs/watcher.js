var co = require('co');
var gaze = require('gaze');

var build = require('./build');

var pin = co(require('./pin'));
var update = co(require('./update'));
var outdated = co(require('./outdated'));
var resolve = co(build.resolve);
var scripts = co(build.scripts);
var styles = co(build.styles);
var files = co(build.files);

resolve(onerror);

// to do: actual CLI options
if (~process.argv.indexOf('--kill')) return;

process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
  switch (data.trim()) {
    case 'update':
      return update(onerror);
    case 'pin':
    case 'set':
      return pin(onerror);
    case 'outdated':
      return outdated(onerror);
    case 'resolve':
    case 'build':
    case 'make':
      return resolve(onerror);
    case 'scripts':
    case 'build scripts':
    case 'make scripts':
      return scripts(onerror);
    case 'styles':
    case 'build styles':
    case 'make styles':
      return styles(onerror);
    case 'files':
    case 'build files':
    case 'make files':
      return files(onerror);
    case 'quit':
    case 'exit':
      process.exit();
  }
});

var config = require('./config');

var paths = config.paths;

// resolve watcher
{
  var globs = paths.map(function (p) {
    return p + '/**/component.json';
  });

  gaze(globs)
    .on('error', onerror)
    .on('all', function () {
      resolve(onerror);
    });
}

// scripts watcher
{
  var globs = [];
  paths.forEach(function (p) {
    config.extensions.scripts.forEach(function (ext) {
      globs.push(p + '/**/*.' + ext);
    });
  });

  gaze(globs)
    .on('error', onerror)
    .on('all', function (event, filename) {
      if (/component\.json$/.test(filename)) return;
      scripts(onerror);
    });
}

// styles watcher
{
  var globs = [];
  paths.forEach(function (p) {
    config.extensions.styles.forEach(function (ext) {
      globs.push(p + '/**/*.' + ext);
    });
  });

  gaze(globs)
    .on('error', onerror)
    .on('all', function () {
      styles(onerror);
    });
}

// files watcher

function onerror(err) {
  if (err) console.error(err.stack);
}