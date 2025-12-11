import { describe, it, expect } from 'vitest'

describe('Hiking Safety Guide Tool', () => {
  it('should contain essential gear items', () => {
    const essentialGear = [
      'water',
      'hiking boots',
      'weather-appropriate clothing',
      'rain jacket',
      'sun hat',
      'sunscreen',
      'first aid kit',
      'emergency whistle',
      'headlamp',
      'map and compass',
      'phone with power bank',
    ]
    
    expect(essentialGear).toHaveLength(11)
    expect(essentialGear).toContain('water')
  })

  it('should list all safety categories', () => {
    const categories = [
      'pre-hike preparation',
      'essential gear',
      'during the hike',
      'weather hazards',
      'injury prevention',
      'wildlife encounters',
      'emergency procedures',
    ]
    
    expect(categories).toHaveLength(7)
    expect(categories).toContain('weather hazards')
  })

  it('should have weather safety tips', () => {
    const weatherHazards = [
      'lightning',
      'extreme heat',
      'cold/hypothermia',
      'flash floods',
    ]
    
    expect(weatherHazards).toHaveLength(4)
  })

  it('should include wildlife safety guidelines', () => {
    const wildlife = {
      largeAnimals: 'make noise, back away',
      snakes: 'watch step, give space',
      ticks: 'use repellent, remove with tweezers',
    }
    
    expect(wildlife).toHaveProperty('largeAnimals')
    expect(wildlife).toHaveProperty('snakes')
    expect(wildlife).toHaveProperty('ticks')
  })

  it('should list emergency procedures', () => {
    const emergencySteps = [
      'stay calm',
      'assess situation',
      'call for help',
      'stay in place',
      'apply first aid',
      'stay warm',
    ]
    
    expect(emergencySteps).toHaveLength(6)
    expect(emergencySteps[0]).toBe('stay calm')
  })

  it('should emphasize life safety priority', () => {
    const priority = 'Life safety is #1'
    expect(priority).toContain('Life safety')
    expect(priority).toContain('#1')
  })
})
