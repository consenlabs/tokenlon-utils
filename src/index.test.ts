import { imUtils } from './index'

describe('imUtils', () => {
  it('should return true if imUtils contain is property', () => {
    expect(imUtils).toHaveProperty('is')
  })
  it('should return true if imUtils contain helper property', () => {
    expect(imUtils).toHaveProperty('helper')
  })
  it('should return true if imUtils contain helper property', () => {
    expect(imUtils).toHaveProperty('format')
  })
  it('should return true if imUtils contain helper property', () => {
    expect(imUtils).toHaveProperty('sdk')
  })
  it('should return true if imUtils contain helper property', () => {
    expect(imUtils).toHaveProperty('request')
  })
})
