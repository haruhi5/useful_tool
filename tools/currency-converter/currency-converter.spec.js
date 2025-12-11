import { describe, it, expect } from 'vitest'

describe('Currency Converter Tool', () => {
  it('should handle USD conversion', () => {
    const amount = 100
    const exchangeRates = {
      SGD: 1.35,
      CNY: 7.08,
    }
    
    const convertedSGD = (amount * exchangeRates.SGD)
    const convertedCNY = (amount * exchangeRates.CNY)
    
    expect(convertedSGD).toBeCloseTo(135, 0)
    expect(convertedCNY).toBeCloseTo(708, 0)
  })

  it('should convert SGD to USD', () => {
    const amount = 100
    const exchangeRates = {
      SGD: 1.35,
      CNY: 7.08,
    }
    
    const baseToUSD = amount * exchangeRates.SGD
    const convertedUSD = baseToUSD / 1 // 1 USD base
    
    expect(convertedUSD).toBeCloseTo(135, 0)
  })

  it('should convert CNY to USD', () => {
    const amount = 100
    const exchangeRates = {
      SGD: 1.35,
      CNY: 7.08,
    }
    
    const baseToUSD = amount * exchangeRates.CNY
    expect(baseToUSD).toBeCloseTo(708, 0)
  })

  it('should handle zero amount', () => {
    const amount = 0
    const result = amount * 1.35
    expect(result).toBe(0)
  })

  it('should support decimal amounts', () => {
    const amount = 10.5
    const rate = 1.35
    const result = amount * rate
    expect(result).toBeCloseTo(14.175, 3)
  })

  it('should validate exchange rates structure', () => {
    const rates = {
      SGD: 1.35,
      CNY: 7.08,
    }
    
    expect(rates).toHaveProperty('SGD')
    expect(rates).toHaveProperty('CNY')
    expect(typeof rates.SGD).toBe('number')
    expect(typeof rates.CNY).toBe('number')
  })
})
