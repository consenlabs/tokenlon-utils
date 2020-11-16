import BN from 'bignumber.js'
import { queryUrlSearchParams } from '../url'

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

/**
 * check current page is load by reload
 * https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript
 */
const isReload = () => {
  return (
    window.performance &&
    window.performance.navigation &&
    window.performance.navigation.type === 1
  )
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

export {
  isHexPrefixed,
  isTestnet,
  isStaging,
  isDev,
  isReload,
  isDecimalOverflow,
  isiPhoneX,
  isExist,
  isimTokenApp,
  isBigNumber,
}
