import BN from 'bignumber.js'
import Web3 from 'web3'
import { queryUrlSearchParams } from '../helper'

const _getUa = () => {
  let ua
  if (typeof window !== 'undefined') {
    ua =
      ('navigator' in window &&
        'userAgent' in navigator &&
        navigator.userAgent.toLowerCase()) ||
      ''
  }
  return ua
}
type Is = {
  imTokenApp: (userAgent: string) => boolean
  iPhoneX: () => boolean
  decimalOverflow: (num: string, length: number) => boolean
  dev: (currentHost?: string) => boolean
  staging: (currentHost?: string) => boolean
  bigNumber: (v: any) => boolean
  startWithOx: (str: string) => boolean
  testnet: () => boolean
  mobile: () => boolean
  ethAddress: (address: string) => boolean
}
const is = {} as Is
const web3 = new Web3()

is.imTokenApp = (userAgent: string) => {
  return window && window.imToken && /Mobile/i.test(userAgent)
}
is.ethAddress = (address: string) => {
  const addr =
    Object.prototype.toString.call(address) === '[object String]'
      ? address.trim()
      : address
  return web3.isAddress(addr)
}
is.iPhoneX = () => {
  if (window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    )
  }
  return false
}

is.decimalOverflow = (num: string, length: number) => {
  const fraction = num.split('.')[1]
  return !!(fraction && fraction.length > length)
}

is.dev = (currentHost?: string) => {
  const host = currentHost || window.location.host
  return (
    host.indexOf('localhost') !== -1 ||
    host.indexOf('.dev.') !== -1 ||
    host.indexOf('192.') !== -1
  )
}

is.staging = (currentHost?: string) => {
  const host = currentHost || window.location.host
  return host.indexOf('.staging.') !== -1
}

is.bigNumber = (v: any) => {
  return (
    v instanceof BN || (v && v.isBigNumber) || (v && v._isBigNumber) || false
  )
}
is.startWithOx = (str: string) => {
  return str.startsWith('0x')
}

is.testnet = () => {
  const qsTestnet = queryUrlSearchParams('testnet')
  return (
    !!qsTestnet ||
    (window['ethereum'] && window['ethereum'].networkVersion === '42')
  )
}

is.mobile = () => {
  const ua = _getUa()
  return !!ua.match(/(iPhone|iPod|android|ios|iPad|windows phone|tablet)/i)
}

export default is
