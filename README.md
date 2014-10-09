# regex-format [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![DevDependency Status][david-dev-badge]][david-dev]

[![npm](https://nodei.co/npm/regex-format.png)](https://nodei.co/npm/regex-format/)

[travis-badge]: https://travis-ci.org/eush77/regex-format.svg
[travis]: https://travis-ci.org/eush77/regex-format
[david-badge]: https://david-dm.org/eush77/regex-format.png
[david]: https://david-dm.org/eush77/regex-format
[david-dev-badge]: https://david-dm.org/eush77/regex-format/dev-status.png
[david-dev]: https://david-dm.org/eush77/regex-format#info=devDependencies

Format regex with string substitutions. Auto-escape RegExp special characters.

Wrapper around [string-format](https://www.npmjs.org/package/string-format).

## Example

```js
> regexFormat(/^Author:\s+{#name} <{#email}>$/, {
    name: 'someone',
    email: 'someone@example.com'
  })
// /^Author:\s+someone <someone@example\.com>$/
```

Or you can extend RegExp's prototype and it will also work:

```js
> RegExp.prototype.format = regexFormat
> /^Author:\s+{#name} <{#email}>$/.format({
    name: 'someone',
    email: 'someone@example.com'
  })
// /^Author:\s+someone <someone@example\.com>$/
```

Alternatively, you can `extendRegExp`:

```js
> require('regex-format').extendRegExp()
> typeof /./.format
'function'
```

`regex-format` is also just a nicer way to construct RegExps from strings.

```js
require('regex-format').extendRegExp();

var regexp = /^{}$/.format(str);
```

This is equivalent to `RegExp('^' + escapeStringRegexp(str) + '$')`.

## API

### regexFormat(spec, [values]...)

`spec` is a RegExp, otherwise it is converted to RegExp. Flags are preserved.

If `regexFormat` is called in the context of a RegExp, it will use it as a `spec` (see the examples above).

The syntax for substitutions is the same as accepted by [string-format](https://www.npmjs.org/package/string-format), except that non-empty groups are prepended with a hash sign: `{#0}`, `{#foo.bar}`, etc (empty groups are still `{}`).

### regexFormat.extendRegExp()

Equivalent to `RegExp.prototype.format = regexFormat`.

Returns `regexFormat`.

## Install

```shell
npm install regex-format
```

## License

MIT