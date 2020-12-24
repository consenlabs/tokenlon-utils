import { imUtils } from './index'

describe('imUtils', () => {
  it('should return true if imUtils contain judge property', () => {
    expect(imUtils).toHaveProperty('judge')
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
    expect(imUtils).toHaveProperty('url')
  })
  it('should return true if imUtils contain helper property', () => {
    expect(imUtils).toHaveProperty('request')
  })
})
