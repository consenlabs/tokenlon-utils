import is from '../index'
import { toBN } from '../../format'

global.window = Object.create(window)
const mockUrl = (url: string) => {
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
  })
}
const mockUserAgent = (agentName: string) => {
  return (navigator as any).__defineGetter__('userAgent', () => {
    return agentName
  })
}
describe('isDev', () => {
  it('should return true if url include .dev', () => {
    const url = 'http://tokenlon.dev.com'
    mockUrl(url)
    expect(is.dev(url)).toBe(true)
  })
  it('should return false if url not include .dev', () => {
    const url = 'http://tokenlon.com'
    mockUrl(url)
    expect(is.dev(url)).toBe(false)
  })
  it('should return true if url include localhost', () => {
    const url = 'http://localhost:8080'
    mockUrl(url)
    expect(is.dev(url)).toBe(true)
  })
  it('should return true if url include ip address', () => {
    const url = '192.168.0.1:8080'
    mockUrl(url)
    expect(is.dev(url)).toBe(true)
  })
})

describe('isStaging', () => {
  it('should return true if url include .staging', () => {
    const url = 'http://tokenlon.staging.com'
    mockUrl(url)
    expect(is.staging(url)).toBe(true)
  })
  it('should return false if url not include .staging', () => {
    const url = 'http://tokenlon.com'
    mockUrl(url)
    expect(is.staging(url)).toBe(false)
  })
  it('should return false if url include localhost', () => {
    const url = 'http://localhost:8080'
    mockUrl(url)
    expect(is.staging(url)).toBe(false)
  })
  it('should return false if url include ip address', () => {
    const url = '192.168.0.1:8080'
    mockUrl(url)
    expect(is.staging(url)).toBe(false)
  })
})

describe('isBigNumber', () => {
  it('should return false if not bignumber ', () => {
    expect(is.bigNumber(123456)).toBeFalsy()
  })
  it('should return true if call toBN', () => {
    expect(is.bigNumber(toBN(1234))).toBeTruthy()
  })
})

describe('isMobile', () => {
  it('should return false if ua not mobile', () => {
    mockUserAgent('Mozilla/5.0')
    expect(is.mobile()).toBeFalsy()
  })
  it('should return true if ua is iPhone', () => {
    mockUserAgent('iPhone')
    expect(is.mobile()).toBeTruthy()
  })
  it('should return true if ua is android', () => {
    mockUserAgent('Android')
    expect(is.mobile()).toBeTruthy()
  })
})
describe('ethAddress', () => {
  it('should return true if given value is eth address', () => {
    expect(
      is.ethAddress('0x6B030f453e7E0F1447601EE757947286A60B0122'),
    ).toBeTruthy()
  })
  it('should return false if given value not eth address', () => {
    expect(is.ethAddress('xcfvgybhnjhggvhbjn')).toBeFalsy()
  })
  it('should return false if given value start with 0x but not eth address', () => {
    expect(is.ethAddress('0xjhvgbjnkbhgvhbjn2e21e12e12e')).toBeFalsy()
  })
})

describe('decimalOverflow', () => {
  it('should return true if the precision is not in the given length', () => {
    expect(is.decimalOverflow('23213.213213123', 4)).toBeTruthy()
  })
  it('should return true if the precision is not in the given length', () => {
    expect(is.decimalOverflow('23213.213213123', 2)).toBeTruthy()
  })
  it('should return false if precision is in the given length', () => {
    expect(is.decimalOverflow('23213.21321', 6)).toBeFalsy()
  })
})

describe('startWithOx', () => {
  it('should return true is given value start with 0x', () => {
    expect(is.startWithOx('0xfvghbjn221')).toBeTruthy()
  })
  it('should return false if given value not start with 0x', () => {
    expect(is.startWithOx('asdsadasdasd')).toBeFalsy()
  })
})

describe('exist', () => {
  it('should return false if give value is  undefined', () => {
    expect(is.exist(undefined)).toBeFalsy()
  })
  it('should return true if give value is empty string', () => {
    expect(is.exist('')).toBeTruthy()
  })
  it('should return true if give value is not undefined', () => {
    expect(is.exist('undefined')).toBeTruthy()
  })
  it('should return true if give value is false', () => {
    expect(is.exist(false)).toBeTruthy()
  })
})
