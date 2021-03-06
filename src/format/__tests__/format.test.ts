import BN from 'bignumber.js'
import {
  addDollarPrefix,
  thousandCommas,
  ellipsisByLength,
  fromDecimalToUnit,
  fromUnitToDecimal,
  stripHexPrefix,
  satoshisToBitcoin,
  toBN,
  toFixed,
  toHex,
  processNumberPrecision,
  add0xPrefix,
} from '../index'

describe('toHex', () => {
  it('should convert number to hex', () => {
    expect(toHex(12345)).toBe('0x3039')
  })
  it('should convert string to hex', () => {
    expect(toHex('12345')).toBe('0x3039')
  })
})
describe('toFixed', () => {
  it('should convert number to 4 decimal if not specific dp', () => {
    expect(toFixed(12345)).toBe('12345.0000')
  })
  it('should convert string to 3 decimal if specific dp as 3', () => {
    expect(toFixed('12345', 3)).toBe('12345.000')
  })
})

describe('addDollarPrefix', () => {
  it('should return $18 if get 18.0 ', () => {
    expect(addDollarPrefix(18.0)).toBe('$18')
  })
  it('should return $$0 if get undefined ', () => {
    expect(addDollarPrefix(undefined)).toBe('$0')
  })
})

describe('thousandCommas', () => {
  it('should return `234,234` if get 234234', () => {
    expect(thousandCommas(234234)).toBe('234,234.0000')
  })
  it('should return `100` if get 100', () => {
    expect(thousandCommas(100, 0)).toBe('100')
  })
  it('should return `1,000` if get 1000', () => {
    expect(thousandCommas(1000, 3)).toBe('1,000.000')
  })
  it('should remove the last digit', () => {
    expect(thousandCommas(3.14159)).toBe('3.1415')
  })
})

describe('ellipsisByLength', () => {
  it('should return 12 digit head and 6 digit tail', () => {
    expect(
      ellipsisByLength('hello world,hello world,hello world,hello world'),
    ).toBe('hello world,... world')
  })
  it('should retuen corrent ellipse string if given lead and tail', () => {
    expect(
      ellipsisByLength('hello,imtoken,welcome to crypto world', 13, 4),
    ).toBe('hello,imtoken...orld')
  })
  it('should return str if str length not more than 24', () => {
    expect(ellipsisByLength('hello')).toBe('hello')
  })
})

describe('fromDecimalToUnit', () => {
  it('should format fromDecimalToUnit', () => {
    expect(fromDecimalToUnit(12345678910121234, 18).toString()).toEqual(
      JSON.stringify(0.012345678910121234),
    )
  })
  it('should format fromDecimalToUnit', () => {
    expect(fromDecimalToUnit(0.00001123, 0.1).toString()).toEqual(
      '0.00000892030607595368',
    )
  })
})

describe('toBN', () => {
  it('should number be instanceof BN if call toBN', () => {
    expect(toBN(10000)).toBeInstanceOf(BN)
  })
  it('should string be instanceof BN if call toBN', () => {
    expect(toBN('123456789')).toBeInstanceOf(BN)
  })
  it('should undefined be instanceof BN if call toBN', () => {
    expect(toBN(undefined)).toBeInstanceOf(BN)
  })
  it('should BN be instanceof BN if call toBN', () => {
    const bn = toBN(123)
    expect(toBN(bn)).toBeInstanceOf(BN)
  })
})
describe('fromUnitToDecimal', () => {
  it('shoyld fromUnitToDecimal', () => {
    expect(fromUnitToDecimal(0.0000123, 18, 10)).toBe('12300000000000')
  })
})
describe('stripHexPrefix', () => {
  it('should remove 0x if string start with 0x', () => {
    expect(stripHexPrefix('0x123456787654')).toBe('123456787654')
  })
  it('should return string if string not start with 0x', () => {
    expect(stripHexPrefix('hello')).toBe('hello')
  })
  it('should return itself if  not string', () => {
    expect(stripHexPrefix(null)).toBe(null)
  })
})

describe('satoshisToBitcoin', () => {
  it('should format satoshisToBitcoin', () => {
    expect(satoshisToBitcoin(998877665544332211)).toBe('9988776655.4433')
  })
  it('should return ~ if value not existed', () => {
    expect(satoshisToBitcoin(null)).toBe('~')
  })
})

describe('add0xPrefix', () => {
  it('should return its orignal string if string start with 0x', () => {
    expect(add0xPrefix('0xsadsdsadasd')).toBe('0xsadsdsadasd')
  })
  it('should format string with 0x prefix if string not start with 0x', () => {
    expect(add0xPrefix('6578uhjnbasdsad')).toBe('0x6578uhjnbasdsad')
  })
})

describe('processNumberPrecision', () => {
  it('should keep 2 decimal if params is 2', () => {
    expect(processNumberPrecision('122222.09876545678', 2)).toBe('122222.09')
  })
  it('should remove the last 0 if fill is false', () => {
    expect(processNumberPrecision('122222.09870000', 4, false)).toBe(
      '122222.0987',
    )
  })
  it('should not remove the last 0 if fill is true', () => {
    expect(processNumberPrecision('122222.76500000', 8, true)).toBe(
      '122222.76500000',
    )
  })
  it('should format number and return string if value is number', () => {
    expect(processNumberPrecision(76132.233, 2)).toBe('76132.23')
  })
  it('should return 0 if value is undefined', () => {
    expect(processNumberPrecision(undefined, 2)).toBe('0')
  })
})
