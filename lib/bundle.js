var flatten = require('component-resolver').flatten;

var config = require('./config');
var resolve = require('./resolve');

var bundles = config.bundles;
var name = config.name;

exports = module.exports = function () {
  if (!bundles) {
    exports[name] = flatten(resolve.tree);
    return exports;
  }

  throw new Error('create your own bundler!');
}