import { ctx, canvas } from './canvas.js';
import { entities, game } from './state.js';
import { spawnParticles } from './particles.js';
import {
  OFFSET_X, OFFSET_Y, GRID_SIZE,
  BASE_DAMAGE_PER_ENEMY,
  FREEZE_SPEED_MULTIPLIER,
} from './constants.js';

export class Enemy {
  /**
   * @param {number} row Grid row to spawn on
   * @param {{hp:number, speed:number}} waveConfig
   */
  constructor(row, waveConfig) {
    this.r = row;
    this.x = canvas.width;
    this.y = OFFSET_Y + row * GRID_SIZE;
    this.hp = waveConfig.hp;
    this.maxHp = waveConfig.hp;
    this.speed = waveConfig.speed;
    this.freeze = 0;
    this.eating = false;
  }

  /**
   * Advance one frame.
   * @returns {boolean} true if the enemy should be removed (reached the base)
   */
  update() {
    let spd = this.speed;
    if (this.freeze > 0) {
      spd *= FREEZE_SPEED_MULTIPLIER;
      this.freeze--;
    }

    if (!this.eating) this.x -= spd;

    // Reached base
    if (this.x < 0) {
      game.hp -= BASE_DAMAGE_PER_ENEMY;
      spawnParticles(this.x, this.y + 45, 'red', 20);
      return true;
    }

    // Check for plant collision
    this.eating = false;
    const col = Math.floor((this.x - OFFSET_X + 45) / GRID_SIZE);
    const plant = entities.plants.find((p) => p.c === col && p.r === this.r);

    if (plant) {
      if (plant.data.type === 'mine') {
        plant.hp = 0;
        this.takeDmg(plant.data.dmg);
        spawnParticles(plant.x + 45, plant.y + 45, 'orange', 30);
      } else {
        this.eating = true;
        plant.hp -= 0.5;
        if (plant.hp <= 0) this.eating = false;
      }
    }

    return false;
  }

  /**
   * Apply damage and spawn a floating text indicator.
   * @param {number} amount
   */
  takeDmg(amount) {
    this.hp -= amount;
  }

  draw() {
    const isBoss = this.maxHp > 500;
    ctx.fillStyle = this.freeze > 0 ? '#00ffff' : isBoss ? 'red' : '#bc13fe';

    const bounce = Math.sin(game.frame * 0.1) * 3;
    ctx.fillRect(this.x + 15, this.y + 15 + bounce, 60, 60);

    // Eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x + 35, this.y + 35 + bounce, 5, 0, Math.PI * 2);
    ctx.arc(this.x + 55, this.y + 35 + bounce, 5, 0, Math.PI * 2);
    ctx.fill();

    // Health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x + 15, this.y - 5 + bounce, 60, 4);
    ctx.fillStyle = '#0f0';
    ctx.fillRect(this.x + 15, this.y - 5 + bounce, 60 * (this.hp / this.maxHp), 4);
  }
}
