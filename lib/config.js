var path = require('path');
var mkdirp = require('mkdirp');

const CONFIG = process.COMPONENT_WATCHER_CONFIG;

exports = module.exports = CONFIG
  ? require(path.resolve(CONFIG))
  : require('../config.json');

// custom root
exports.root = exports.root
  ? path.resolve(exports.root)
  : process.cwd();

// build path
exports.out = path.resolve(exports.root, exports.out || 'build');
mkdirp.sync(exports.out);

var json = require(path.join(exports.root, 'component.json'));
exports.name = json.name || 'component';

// lookup paths
exports.paths = exports.paths || json.paths || [];
if (!exports.paths) throw new Error('no paths?');

// bundles
if (Array.isArray(exports.bundles)) {
  // explicitly name the bundles

} else if (exports.bundles === true) {
  // bundles are locals listed
  var locals = json.local || json.locals;
  if (Array.isArray(locals) && json.paths) exports.bundles = locals;
}