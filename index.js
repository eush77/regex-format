'use strict';

var oldStringFormat = String.prototype.format;

var stringFormat = require('string-format')
  , escapeStringRegexp = require('escape-string-regexp')
  , traverse = require('traverse')
  , compose = require('lodash.compose');

// Workaround over string-format's prototype clogging.
String.prototype.format = oldStringFormat;

module.exports = function (spec) {
  var params = [].slice.call(arguments);

  // If it is called in the context of RegExp, use it as a spec.
  if (this instanceof RegExp) {
    spec = this;
  }
  else {
    spec = RegExp(spec);
    params = params.slice(1);
  }

  var source = spec.source
    , flags = spec.toString().match('/([^/]*)$')[1];

  // Escape substitutions.
  traverse(params).forEach(function (node) {
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
