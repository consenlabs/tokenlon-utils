import { isStaging, isDev, isBigNumber, isMobile } from '../index'
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
    expect(isDev(url)).toBe(true)
  })
  it('should return false if url not include .dev', () => {
    const url = 'http://tokenlon.com'
    mockUrl(url)
    expect(isDev(url)).toBe(false)
  })
  it('should return true if url include localhost', () => {
    const url = 'http://localhost:8080'
    mockUrl(url)
    expect(isDev(url)).toBe(true)
  })
  it('should return true if url include ip address', () => {
    const url = '192.168.0.1:8080'
    mockUrl(url)
    expect(isDev(url)).toBe(true)
  })
})

describe('isStaging', () => {
  it('should return true if url include .staging', () => {
    const url = 'http://tokenlon.staging.com'
    mockUrl(url)
    expect(isStaging(url)).toBe(true)
  })
  it('should return false if url not include .staging', () => {
    const url = 'http://tokenlon.com'
    mockUrl(url)
    expect(isStaging(url)).toBe(false)
  })
  it('should return false if url include localhost', () => {
    const url = 'http://localhost:8080'
    mockUrl(url)
    expect(isStaging(url)).toBe(false)
  })
  it('should return false if url include ip address', () => {
    const url = '192.168.0.1:8080'
    mockUrl(url)
    expect(isStaging(url)).toBe(false)
  })
})

describe('isBigNumber', () => {
  it('should return false if not bignumber ', () => {
    expect(isBigNumber(123456)).toBeFalsy()
  })
  it('should return true if call toBN', () => {
    expect(isBigNumber(toBN(1234))).toBeTruthy()
  })
})

describe('isMobile', () => {
  it('should return false if ua not mobile', () => {
    mockUserAgent('Mozilla/5.0')
    expect(isMobile()).toBeFalsy()
  })
  it('should return true if ua is iPhone', () => {
    mockUserAgent('iPhone')
    expect(isMobile()).toBeTruthy()
  })
  it('should return true if ua is android', () => {
    mockUserAgent('Android')
    expect(isMobile()).toBeTruthy()
  })
})
