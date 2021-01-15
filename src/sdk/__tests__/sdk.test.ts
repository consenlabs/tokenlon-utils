import { getEthereumAccounts, getAccounts } from '../index'

describe('getEthereumAccounts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it('should call enable if call getEthereumAccounts', () => {
    ;(global as any).ethereum = {
      enable: jest.fn(),
    }
    getEthereumAccounts()
    expect((global as any).ethereum.enable).toHaveBeenCalled()
  })
  it('should return array string resolved value if call enable', () => {
    ;(global as any).ethereum = {
      enable: jest.fn().mockResolvedValue(['0xssdd']),
    }
    const value = getEthereumAccounts()
    expect(value).resolves.toBe(['0xssdd'])
  })
})
describe('getAccounts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it('should call enable if call getAccounts', () => {
    ;(global as any).ethereum = {
      enable: jest.fn(),
    }
    getAccounts()
    expect((global as any).ethereum.enable).toHaveBeenCalled()
  })
  it('should call window.imToken.callPromisifyAPI if call getAccounts', () => {
    ;(global as any).imToken = {
      callPromisifyAPI: jest.fn(),
    }
    ;(global as any).ethereum = undefined
    getAccounts()
    expect((global as any).imToken.callPromisifyAPI).toHaveBeenCalled()
  })
})
