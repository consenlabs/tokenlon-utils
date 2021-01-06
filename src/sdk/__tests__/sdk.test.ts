import { getEthereumAccounts } from '../index'

describe('getEthereumAccounts', () => {
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
