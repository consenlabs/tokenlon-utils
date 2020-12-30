import { compareSemver, padLeft, encodeURLParams } from '../index'

describe('compareSemver', () => {
  it('should return -1 if base version smaller than compare version', () => {
    expect(compareSemver('1.6.3', '1.6.4')).toBe(-1)
  })
  it('should return 1 if base version bigger than compare version', () => {
    expect(compareSemver('2.6.3', '2.6.0')).toBe(1)
  })
  it('should return 0 if two version equal', () => {
    expect(compareSemver('2.6.3', '2.6.3')).toBe(0)
  })
})

describe('padLeft', () => {
  it('should pad 0 to left if string provide', () => {
    expect(padLeft('0x6B030f453e7E0F1447601EE757947286A60B0122', 64)).toBe(
      '00000000000000000000000x6B030f453e7E0F1447601EE757947286A60B0122',
    )
  })
})

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
