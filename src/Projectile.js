import { ctx, canvas } from './canvas.js';
import { entities } from './state.js';
import { spawnParticles } from './particles.js';
import {
  PROJECTILE_SPEED,
  PROJECTILE_HIT_RADIUS,
  FREEZE_DURATION,
  SPLASH_RADIUS,
} from './constants.js';

export class Projectile {
  /**
   * @param {number} x Starting X position
   * @param {number} y Starting Y position
   * @param {number} row Target grid row
   * @param {object} data Plant definition (dmg, effect, color)
   */
  constructor(x, y, row, data) {
    this.x = x;
    this.y = y;
    this.r = row;
    this.data = data;
    this.speed = PROJECTILE_SPEED;
    this.dead = false;
  }

  update() {
    this.x += this.speed;
    if (this.x > canvas.width) {
      this.dead = true;
      return;
    }

    const target = entities.enemies.find(
      (e) => e.r === this.r && Math.abs(e.x - this.x) < PROJECTILE_HIT_RADIUS
    );

    if (!target) return;

    this.dead = true;

    if (this.data.effect === 'splash') {
      entities.enemies.forEach((e) => {
        if (Math.abs(e.x - target.x) < SPLASH_RADIUS && Math.abs(e.y - target.y) < SPLASH_RADIUS) {
          e.takeDmg(this.data.dmg / 2);
        }
      });
      spawnParticles(this.x, this.y, 'white', 10);
    }

    target.takeDmg(this.data.dmg);

    if (this.data.effect === 'slow') target.freeze = FREEZE_DURATION;

    spawnParticles(this.x, this.y, this.data.color, 5);
  }

  draw() {
    ctx.fillStyle = this.data.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}
