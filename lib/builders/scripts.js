var build = require('component-builder2');

var config = require('../config');

var options = config.options.scripts;

module.exports = function* (branches, bundle) {
  var builder = build.scripts(branches, options.builder)
    .use('scripts',
      build.plugins.js())
    .use('json',
      build.plugins.json())
    .use('templates',
      build.plugins.string());

  var str = yield builder.toStr();

  return str;
}