import BN from 'bignumber.js'
import is from '../is'

type Format_Value = string | number | BN

BN.config({
  EXPONENTIAL_AT: 1000,
})

const toBN = (x: number | BN | string): BN => {
  if (isNaN(Number(x))) return new BN(0)
  if (x instanceof BN) return x

  if (typeof x === 'string') {
    if (x.indexOf('0x') === 0 || x.indexOf('-0x') === 0) {
      return new BN(x.replace('0x', ''), 16)
    }
  }
  return new BN(x)
}

const toFixed = (
  n: Format_Value,
  dp: number = 4,
  rm: BN.RoundingMode = 1,
): string => {
  return toBN(n).toFixed(dp, rm)
}

const toHex = (num: string | number): string | number => {
  if (String(num).startsWith('0x')) {
    return num
  }
  return `0x${toBN(num).toString(16)}`
}

const addDollarPrefix = (num: number) => {
  if (num === undefined) {
    return '$0'
  }
  return `$${Number(num.toFixed(0)).toLocaleString('en-us')}`
}

const thousandCommas = (num: number | string, place: number = 4): string => {
  if (place < 0 || place > 20) {
    return toBN(num).toString(10)
  }

  const n = toBN(num).toFormat(place, 1)
  /**
   *  小数位去零
   * 3.14159000 =>  3.14159
   * 3.00 => 3
   * 3.00012 => 3.00012
   * 3.0001200 => 3.00012
   * 31415 => 31,415
   */
  // return n.replace(/\.0+$/g, '').replace(/\.(.*[^0])0+$/g, '.$1'
  return n
}
const ellipsisByLength = (
  str: string,
  lead: number = 12,
  tail: number = 6,
): string => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(
      str.length - tail,
      str.length,
    )}`
  }
  return str
}

function stripHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }
  return is.startWithOx(str) ? str.slice(2) : str
}

function fromDecimalToUnit(balance: string | number | BN, decimal: number): BN {
  return toBN(balance).dividedBy(Math.pow(10, decimal))
}
function fromUnitToDecimalBN(balance: string | number, decimal: number) {
  const amountBN = toBN(balance || 0)
  const decimalBN = toBN(10).pow(decimal)
  return amountBN.times(decimalBN)
}

function fromUnitToDecimal(
  balance: string | number,
  decimal: number,
  base: number,
): string {
  return fromUnitToDecimalBN(balance, decimal).toString(base)
}

function satoshisToBitcoin(value: number): string | number {
  if (!value) {
    return '~'
  }
  return (value / Math.pow(10, 8)).toFixed(4)
}

function add0xPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }
  return is.startWithOx(str) ? str : `0x${str}`
}

const processNumberPrecision = (
  value: string | number,
  digits: number = 4,
  fillZero?: boolean,
): string => {
  if (!value || Number(value) === 0) return '0'

  const formatValue = toFixed(value, digits, 1)
  if (formatValue === undefined || fillZero) {
    return formatValue
  }
  const result = toBN(formatValue).toString()
  if (result.indexOf('.') !== -1) {
    return result
  }
  return toBN(formatValue).toFixed(2, 1)
}

export {
  addDollarPrefix,
  thousandCommas,
  ellipsisByLength,
  fromUnitToDecimal,
  fromDecimalToUnit,
  fromUnitToDecimalBN,
  stripHexPrefix,
  satoshisToBitcoin,
  add0xPrefix,
  toBN,
  toFixed,
  toHex,
  processNumberPrecision,
}
