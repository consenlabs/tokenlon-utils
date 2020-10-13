import { getEthereumAccounts } from '../index'

global.window = Object.create(window)
const mockUrl = () => {
  Object.defineProperty(window, 'ethereum', {
    value: {
      enable: jest.fn(),
    },
  })
}
describe('getEthereumAccounts', () => {
  it('', () => {
    Object.defineProperty(window, 'ethereum', {
      value: {
        enable: jest.fn(),
      },
    })

    // mockUrl()
    // const mockFn = jest.fn()
    // mockFn()
    // expect(mockFn).toHaveBeenCalled()
    // getEthereumAccounts()
    // expect(getEthereumAccounts).toHaveBeenCalled()
  })
})
