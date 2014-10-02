'use strict';

var stringFormat = require('string-format')
  , escapeStringRegexp = require('escape-string-regexp')
  , traverse = require('traverse')
  , compose = require('lodash.compose');


module.exports = function (regexp) {
  if (!(regexp instanceof RegExp)) {
    regexp = RegExp(regexp);
  }

  var source = regexp.source
    , flags = regexp.toString().match('/([^/]*)$')[1];

  // Escape substitutions.
  var params = traverse([].slice.call(arguments, 1)).map(function (node) {
    if (this.isLeaf) {
      if (typeof node == 'function') {
        this.update(compose(escapeStringRegexp, String, node));
      }
      else {
        this.update(escapeStringRegexp(String(node)));
      }
    }
  });

  // Whether a format group was matched ("{}" or "{#...}"),
  //   contrary to the ordinary RegExp syntax ("{1}", "{1,2}").
  var group;

  source = source.replace(/(\\*)(\{|\})([#}]?)/g, function (match, backslashes, brace, hash) {
    if (backslashes.length % 2) {
      // Escaped brace.
      return backslashes + brace + brace + hash;
    }
    else if (brace == '{') {
      group = !!hash;
      return backslashes + brace + (group ? '' : brace) + (hash == '}' ? hash : '');
    }
    else {
      return backslashes + brace + (group ? '' : brace) + hash;
    }
  });

  source = stringFormat.apply(null, [source].concat(params));
  return RegExp(source, flags);
};
