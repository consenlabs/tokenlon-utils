import { encodeURLParams } from '../index'

const urlObj = {
  name: 'tokenlon',
  amount: 1,
  side: 'sell',
  source: 'imToken',
}
describe('convertObjToUrlParams', () => {
  it('should return true if matched', () => {
    expect(encodeURLParams(urlObj)).toBe(
      'name=tokenlon&amount=1&side=sell&source=imToken',
    )
  })
})
