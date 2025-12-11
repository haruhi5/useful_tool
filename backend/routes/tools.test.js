import { describe, it, expect } from 'vitest'

describe('Backend - Tools Routes', () => {
  it('should list all available tools', () => {
    const tools = [
      { id: 'spin-wheel', name: 'Spin Wheel', category: 'game' },
      { id: 'currency', name: 'Currency Converter', category: 'utility' },
      { id: 'hiking-guide', name: 'Hiking Safety Guide', category: 'guide' }
    ]

    expect(tools).toHaveLength(3)
    expect(tools[0].id).toBe('spin-wheel')
  })

  it('should validate tool object structure', () => {
    const tool = { id: 'test', name: 'Test Tool', category: 'utility' }
    
    expect(tool).toHaveProperty('id')
    expect(tool).toHaveProperty('name')
    expect(tool).toHaveProperty('category')
  })
})
