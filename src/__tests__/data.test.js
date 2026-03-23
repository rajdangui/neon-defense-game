import { describe, it, expect } from 'vitest';
import { PLANTS, WAVES } from '../data.js';

describe('PLANTS data', () => {
  it('contains 8 plant types', () => {
    expect(PLANTS).toHaveLength(8);
  });

  it('each plant has required fields', () => {
    PLANTS.forEach((plant) => {
      expect(plant).toHaveProperty('id');
      expect(plant).toHaveProperty('name');
      expect(plant).toHaveProperty('cost');
      expect(plant).toHaveProperty('hp');
      expect(plant).toHaveProperty('icon');
      expect(plant).toHaveProperty('color');
      expect(plant).toHaveProperty('type');
    });
  });

  it('ids are sequential starting at 0', () => {
    PLANTS.forEach((plant, index) => {
      expect(plant.id).toBe(index);
    });
  });

  it('shooting plants have dmg and rate fields', () => {
    PLANTS.filter((p) => p.type === 'shoot').forEach((plant) => {
      expect(plant).toHaveProperty('dmg');
      expect(plant).toHaveProperty('rate');
      expect(plant.dmg).toBeGreaterThan(0);
      expect(plant.rate).toBeGreaterThan(0);
    });
  });

  it('all costs are positive numbers', () => {
    PLANTS.forEach((plant) => {
      expect(plant.cost).toBeGreaterThan(0);
    });
  });
});

describe('WAVES data', () => {
  it('contains 7 waves', () => {
    expect(WAVES).toHaveLength(7);
  });

  it('each wave has required fields', () => {
    WAVES.forEach((wave) => {
      expect(wave).toHaveProperty('count');
      expect(wave).toHaveProperty('hp');
      expect(wave).toHaveProperty('speed');
      expect(wave).toHaveProperty('interval');
      expect(wave).toHaveProperty('label');
    });
  });

  it('enemy counts are positive', () => {
    WAVES.forEach((wave) => {
      expect(wave.count).toBeGreaterThan(0);
    });
  });

  it('final wave has the highest HP (boss)', () => {
    const maxHp = Math.max(...WAVES.map((w) => w.hp));
    expect(WAVES[WAVES.length - 1].hp).toBe(maxHp);
  });

  it('final wave label is Final Boss', () => {
    expect(WAVES[WAVES.length - 1].label).toBe('Final Boss');
  });
});
