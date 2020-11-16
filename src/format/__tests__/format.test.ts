import BN from 'bignumber.js'
import {
  addDollarSignBeforeNumber,
  formatThousandCommas,
  ellipsisByLength,
  fromDecimalToUnit,
  fromUnitToDecimal,
  stripHexPrefix,
  satoshisToBitcoin,
  toBN,
} from '../index'

describe('addDollarSignBeforeNumber', () => {
  it('should return $18 if get 18.0 ', () => {
    expect(addDollarSignBeforeNumber(18.0)).toBe('$18')
  })
  it('should return $$0 if get undefined ', () => {
    expect(addDollarSignBeforeNumber(undefined)).toBe('$0')
  })
})

describe('formatThousandCommas', () => {
  it('should return 234,234 if get 234234', () => {
    expect(formatThousandCommas(234234)).toBe('234,234')
  })
  it('should return 100 if get 100', () => {
    expect(formatThousandCommas(100, 3)).toBe('100')
  })
  it('should return 1,000 if get 1000', () => {
    expect(formatThousandCommas(1000, 3)).toBe('1,000')
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
