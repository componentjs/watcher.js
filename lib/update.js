var versions = require('component-versions');
var co = require('co');

exports = module.exports = function* () {
  yield* versions({
    silent: false,
    update: true,
    pin: false,
  }).run();
}

if (!module.parent) co(exports)();