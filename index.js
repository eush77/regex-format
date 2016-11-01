'use strict';

var stringFormat = require('string-format'),
    escapeStringRegexp = require('escape-string-regexp'),
    traverse = require('traverse'),
    flowright = require('lodash.flowright');


var regexFormat = function (spec) {
  spec = RegExp(spec);
  var params = [].slice.call(arguments, 1);

  var source = spec.source,
      flags = spec.toString().match('/([^/]*)$')[1];

  // Escape substitutions.
  var escapedParams = traverse(params).map(function (node) {
    if (this.isLeaf) {
      if (typeof node == 'function') {
        this.update(flowright(escapeStringRegexp, String, node));
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

  source = stringFormat.apply(null, [source].concat(escapedParams));
  return RegExp(source, flags);
};


module.exports = regexFormat;
