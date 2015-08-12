# regex-format [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![DevDependency Status][david-dev-badge]][david-dev]

[![npm](https://nodei.co/npm/regex-format.png)](https://nodei.co/npm/regex-format/)

[travis-badge]: https://travis-ci.org/eush77/regex-format.svg
[travis]: https://travis-ci.org/eush77/regex-format
[david-badge]: https://david-dm.org/eush77/regex-format.png
[david]: https://david-dm.org/eush77/regex-format
[david-dev-badge]: https://david-dm.org/eush77/regex-format/dev-status.png
[david-dev]: https://david-dm.org/eush77/regex-format#info=devDependencies

Format regex with string substitutions.

## Example

```js
regexFormat(/^Author:\s+{#name} <{#email}>$/, {
  name: 'someone',
  email: 'someone@example.com'
})
//=> /^Author:\s+someone <someone@example\.com>$/

regexFormat(/^{}$/, 'foo$1')
//=> /^foo\$1$/
```

## API

### regexFormat(spec, [values]...)

`spec` is a RegExp, otherwise it is converted to RegExp. Flags are preserved.

The syntax for substitutions is the same as accepted by [string-format](https://www.npmjs.org/package/string-format), except that non-empty groups are prepended with a hash sign: `{#0}`, `{#foo.bar}`, etc (empty groups are still `{}`).

## Install

```shell
npm install regex-format
```

## License

MIT
