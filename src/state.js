import { PLANTS } from './data.js';
import { STARTING_SUN, BASE_MAX_HP } from './constants.js';

/**
 * Core game state — mutated directly by the game loop.
 * Wrapped in an object so modules share the same reference.
 */
export const game = {
  sun: STARTING_SUN,
  wave: 0,
  hp: BASE_MAX_HP,
  active: false,
  waveInProgress: false,
  enemiesToSpawn: 0,
  spawnTimer: 0,
  frame: 0,
};

/** Live entity collections. */
export const entities = {
  plants: [],
  enemies: [],
  projectiles: [],
  particles: [],
  texts: [],
};

/** Index of the currently selected plant card (-1 = none). */
export const selection = { index: -1 };

/** Per-card placement cooldown timers (counts down in frames). */
export const plantCooldowns = new Array(PLANTS.length).fill(0);

/** Reset all state to initial values for a new game. */
export function resetState() {
  game.sun = STARTING_SUN;
  game.wave = 0;
  game.hp = BASE_MAX_HP;
  game.active = true;
  game.waveInProgress = false;
  game.enemiesToSpawn = 0;
  game.spawnTimer = 0;
  game.frame = 0;

  entities.plants = [];
  entities.enemies = [];
  entities.projectiles = [];
  entities.particles = [];
  entities.texts = [];

  selection.index = -1;
  plantCooldowns.fill(0);
}
