# Quick Start

A utils function for tokenlon, which divided to 5 parts, includes `format, helper, is, request, sdk.`

run single file:

```bash
$ yarn run test testFileName.test.ts
```

### Changelog

1. remove `fillHelper`，`fillHelper` always return the given value

2. change `decimal` to `toDecimal`

3. remove `formatNumHelper`，use`toDecimal` to replace，cause of duplicate reuse of logic

4. change `isHexPrefix` to `startWithOx`
