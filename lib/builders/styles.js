var autoprefixer = require('autoprefixer');
var build = require('component-builder2');

var config = require('../config');

var options = config.options.styles;

module.exports = function* (branches, bundle) {
  var builder = build.styles(branches, options)
    .use('styles', build.plugins.css());

  var css = yield builder.toStr();

  css = autoprefixer.process(css).css;

  return css;
}