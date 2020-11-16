import numeral from 'numeral'
import BN from 'bignumber.js'
import { isHexPrefixed } from '../judge'

const addDollarSignBeforeNumber = (num: number) => {
  if (num === undefined) {
    return '$0'
  }
  return `$${Number(num.toFixed(0)).toLocaleString('en-us')}`
}

const formatThousandCommas = (num: string | number, place: number = 4) => {
  const decimals = '0'.repeat(place)
  return numeral(num).format(`0,0.[${decimals}]`)
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
function stripHexPrefix(str: string) {
  if (typeof str !== 'string') {
    return str
  }
  return isHexPrefixed(str) ? str.slice(2) : str
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

export {
  addDollarSignBeforeNumber,
  formatThousandCommas,
  ellipsisByLength,
  fromUnitToDecimal,
  fromDecimalToUnit,
  stripHexPrefix,
  satoshisToBitcoin,
  toBN,
}
