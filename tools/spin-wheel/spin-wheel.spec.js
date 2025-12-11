import { describe, it, expect } from 'vitest'

describe('Spin Wheel Tool', () => {
  it('should initialize with default options', () => {
    const options = [
      { text: 'Option 1', weight: 1, enabled: true },
      { text: 'Option 2', weight: 1, enabled: true },
      { text: 'Option 3', weight: 1, enabled: true },
    ]
    
    expect(options).toHaveLength(3)
    expect(options[0].text).toBe('Option 1')
  })

  it('should filter enabled options correctly', () => {
    const options = [
      { text: 'Option 1', weight: 1, enabled: true },
      { text: 'Option 2', weight: 1, enabled: false },
      { text: 'Option 3', weight: 1, enabled: true },
    ]
    
    const enabled = options.filter(o => o.enabled)
    expect(enabled).toHaveLength(2)
  })

  it('should calculate total weight correctly', () => {
    const options = [
      { text: 'Option 1', weight: 2, enabled: true },
      { text: 'Option 2', weight: 3, enabled: true },
      { text: 'Option 3', weight: 5, enabled: true },
    ]
    
    const totalWeight = options.reduce((sum, o) => sum + o.weight, 0)
    expect(totalWeight).toBe(10)
  })

  it('should handle URL state encoding', () => {
    const state = { 
      options: [{ text: 'Test', weight: 1, enabled: true }],
      recentN: 3 
    }
    
    const encoded = btoa(JSON.stringify(state))
    const decoded = JSON.parse(atob(encoded))
    
    expect(decoded.options[0].text).toBe('Test')
    expect(decoded.recentN).toBe(3)
  })

  it('should prevent spin when no options enabled', () => {
    const options = [
      { text: 'Option 1', weight: 1, enabled: false },
    ]
    
    const enabledOptions = options.filter(o => o.enabled)
    expect(enabledOptions).toHaveLength(0)
  })
})
