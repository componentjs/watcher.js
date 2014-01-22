var versions = require('component-versions');
var co = require('co');

exports = module.exports = function* () {
  yield* versions({
    silent: false,
    update: false,
  }).run();
}

if (!module.parent) co(exports)();