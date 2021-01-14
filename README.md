# Quick Start

A utils function for tokenlon, which divided to 5 parts, includes `format, helper, is, request, sdk, web3.`

run single test file:

```bash
$ yarn run test testFileName.test.ts

// or
$ npx jest testFileName.test.ts
```

### Changelog

1. remove `fillHelper`，`fillHelper` always return the given value

2. change `formatNumHelper` to `processNumberPrecision`, and refactor `formatNumHelper`

3. remove `formatNumHelper`，use`toDecimal` to replace，cause of duplicate reuse of logic

4. change `isHexPrefix` to `startWithOx`

5. change `formatAmount` and `formatMoney` to `thousandCommas`

6. change `formatCurrency` to `addDollarPrefix`

7. change `addHexPrefix` to `add0xPrefix`

8. add web3 utils functions

9. change `getTokenBalance` in `api.ts` to `getTokenBalanceByProvider`

10. change `get` to `requestUrl`
