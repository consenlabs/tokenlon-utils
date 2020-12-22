import BN from 'bignumber.js'
import { queryUrlSearchParams } from '../url'

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
const isimTokenApp = (userAgent) => {
  return window && window.imToken && /Mobile/i.test(userAgent)
}
const isiPhoneX = () => {
  if (window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    )
  }
  return false
}

const isExist = (o: any) => {
  return typeof o !== 'undefined'
}

const isDecimalOverflow = (num: string, length: number) => {
  const fraction = num.split('.')[1]
  return !!(fraction && fraction.length > length)
}

const isDev = (currentHost?: string) => {
  const host = currentHost || window.location.host
  return (
    host.indexOf('localhost') !== -1 ||
    host.indexOf('.dev.') !== -1 ||
    host.indexOf('192.') !== -1
  )
}

const isStaging = (currentHost?: string) => {
  const host = currentHost || window.location.host
  return host.indexOf('.staging.') !== -1
}

const isBigNumber = (v: any) => {
  return (
    v instanceof BN || (v && v.isBigNumber) || (v && v._isBigNumber) || false
  )
}
const isHexPrefixed = (str: string) => {
  return str.startsWith('0x')
}

const isTestnet = () => {
  const qsTestnet = queryUrlSearchParams('testnet')
  return (
    qsTestnet ||
    (window['ethereum'] && window['ethereum'].networkVersion === '42')
  )
}

const isMobile = () => {
  const ua = _getUa()
  return !!ua.match(/(iPhone|iPod|android|ios|iPad|windows phone|tablet)/i)
}

const hasParentNodes = (classname: string) => {
  return (node) => {
    while (node) {
      if (node.classList && node.classList.contains(classname)) {
        return true
      }
      node = node.parentNode
    }
    return false
  }
}
export {
  isHexPrefixed,
  isTestnet,
  isStaging,
  isDev,
  isDecimalOverflow,
  isiPhoneX,
  isExist,
  isimTokenApp,
  isBigNumber,
  hasParentNodes,
  isMobile,
}
