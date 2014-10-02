'use strict';

var stringFormat = require('string-format');


module.exports = function (regexp) {
  if (!(regexp instanceof RegExp)) {
    regexp = RegExp(regexp);
  }

  var source = regexp.source
    , flags = regexp.toString().match('/([^/]*)$')[1]
    , params = [].slice.call(arguments, 1);

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
