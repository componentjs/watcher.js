var versions = require('component-versions');
var co = require('co');

exports = module.exports = function* () {
  yield* versions({
    silent: false,
    update: true,
    pin: true,
  }).run();
}

if (!module.parent) co(exports)();