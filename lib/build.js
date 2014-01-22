var join = require('path').join;
var writeFile = require('fs').writeFile;

/**
 * Shit in progress.
 */

var progress = {
  resolve: false,
  scripts: false,
  styles: false,
  files: false,
}

/**
 * Shit queued.
 */

var queue = {
  resolve: false,
  scripts: false,
  styles: false,
  files: false,
}

/**
 * Relative files, but we make them usable in this entry point.
 */

var resolve = require('./resolve');
var bundle = require('./bundle');
var build = {
  scripts: require('./builders/scripts'),
  styles: require('./builders/styles'),
  files: require('./builders/styles'),
};

var config = require('./config');

var out = config.out;

exports.resolve = function* () {
  if (progress.resolve) return queue.resolve = true;
  progress.resolve = true;

  var start = Date.now();
  console.log('\033[90m --> resolving...\033[0m');

  try {
    yield* resolve();
  } catch (err) {
    // just log the error
    console.error(err.stack);
    progress.resolve = false;
    if (queue.resolve) {
      queue.resolve = false;
      yield* exports.resolve()
    }
    return;
  }

  console.log('\033[90m <-- \033[96mresolved\033[0m \033[90min \033[33m%sms\033[0m', Date.now() - start);

  bundle();

  yield [
    exports.scripts(true),
    exports.styles(true),
    exports.files(),
  ];

  progress.resolve = false;
  if (queue.resolve) {
    queue.resolve = false;
    yield* exports.resolve();
  }
}

exports.scripts = function* (fromResolver) {
  if (!fromResolver && progress.resolve) return;
  if (progress.scripts) return;
  progress.scripts = true;

  yield Object.keys(bundle).map(function (name) {
    return function* () {
      var start = Date.now();
      console.log('\033[90m --> building \033[35m%s\033[90m\'s scripts...\033[0m', name);

      try {
        var js = yield* build.scripts(bundle[name], name);
        // autorequire the build
        js += 'require("' + name + '");';
        yield writeFile.bind(null, join(out, name + '.js'), js);
      } catch (err) {
        console.error(err.stack);
        return
      }

      console.log('\033[90m <-- \033[35m%s\033[90m\'s \033[96mscripts \033[90mbuilt in \033[33m%sms\033[0m', name, Date.now() - start);
    }
  });

  progress.scripts = false;
  if (queue.scripts) {
    queue.scripts = false;
    yield* exports.scripts();
  }
}

exports.styles = function* (fromResolver) {
  if (!fromResolver && progress.resolve) return;
  if (progress.styles) return;
  progress.styles = true;

  yield Object.keys(bundle).map(function (name) {
    return function* () {
      var start = Date.now();
      console.log('\033[90m --> building \033[35m%s\033[90m\'s styles...\033[0m', name);

      try {
        var css = yield* build.styles(bundle[name], name);
        yield writeFile.bind(null, join(out, name + '.css'), css);
      } catch (err) {
        console.error(err.stack);
        return
      }

      console.log('\033[90m <-- \033[35m%s\033[90m\'s \033[96mstyles \033[90mbuilt in \033[33m%sms\033[0m', name, Date.now() - start);
    }
  });

  progress.styles = false;
  if (queue.styles) {
    queue.styles = false;
    yield* exports.styles();
  }
}

exports.files = function* () {

}