var resolve = require('component-resolver');

var config = require('../config');

exports = module.exports = function* () {
  var resolver = resolve(config.root, {
    silent: false,
    install: true,
    fields: config.options.resolver.fields,
  })

  return exports.tree = yield* resolver.tree();
}