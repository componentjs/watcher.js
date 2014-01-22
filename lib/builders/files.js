var build = require('component-builder2');

var config = require('../config');

var options = config.options.files;

module.exports = function* (branches) {
  var builder = build.files(branches, options.builder);

  var plugin = options.copy
    ? build.plugins.copy
    : build.plugins.symlink;

  options.fields.forEach(function (field) {
    builder.use(field, plugin);
  });

  yield builder.end();
}
