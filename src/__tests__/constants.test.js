import { describe, it, expect } from 'vitest';
import {
  GRID_SIZE, OFFSET_X, OFFSET_Y, COLS, ROWS,
  CANVAS_WIDTH, CANVAS_HEIGHT,
  STARTING_SUN, BASE_MAX_HP,
} from '../constants.js';

describe('Game constants', () => {
  it('GRID_SIZE is 90', () => expect(GRID_SIZE).toBe(90));
  it('COLS is 10', ()  => expect(COLS).toBe(10));
  it('ROWS is 5',  ()  => expect(ROWS).toBe(5));

  it('canvas width equals OFFSET_X + COLS * GRID_SIZE + padding', () => {
    // The play area starts at OFFSET_X and spans COLS * GRID_SIZE
    expect(OFFSET_X + COLS * GRID_SIZE).toBeLessThanOrEqual(CANVAS_WIDTH);
  });

  it('canvas height equals OFFSET_Y + ROWS * GRID_SIZE + padding', () => {
    expect(OFFSET_Y + ROWS * GRID_SIZE).toBeLessThanOrEqual(CANVAS_HEIGHT);
  });

  it('STARTING_SUN is a positive number', () => {
    expect(STARTING_SUN).toBeGreaterThan(0);
  });

  it('BASE_MAX_HP is a positive number', () => {
    expect(BASE_MAX_HP).toBeGreaterThan(0);
  });
});
