# regex-format

Format regex with string substitutions. Auto-escape RegExp special characters.

Wrapper around [string-format](https://www.npmjs.org/package/string-format).

## Example

```js
> regexFormat(/^Author:\s+{#name} <{#email}>$/, { name: 'someone', email: 'someone@example.com' })
/^Author:\s+someone <someone@example\.com>$/
```

## API

### regexFormat(spec, [values]...)

`spec` is a RegExp, otherwise it is converted to RegExp. Flags are preserved.

The syntax for substitutions is the same as accepted by [string-format](https://www.npmjs.org/package/string-format), except that non-empty groups are prepended with a hash sign: `{#0}`, `{#foo.bar}`, etc (empty groups are still `{}`).

## License

MIT