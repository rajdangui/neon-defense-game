import { ctx } from './canvas.js';
import { entities, game } from './state.js';
import { spawnText } from './particles.js';
import { Projectile } from './Projectile.js';
import { GRID_SIZE, OFFSET_X, OFFSET_Y, SOLAR_INCOME, SOLAR_INCOME_INTERVAL } from './constants.js';

export class Plant {
  /**
   * @param {number} col Grid column
   * @param {number} row Grid row
   * @param {object} data Plant definition from PLANTS array
   */
  constructor(col, row, data) {
    this.c = col;
    this.r = row;
    this.x = OFFSET_X + col * GRID_SIZE;
    this.y = OFFSET_Y + row * GRID_SIZE;
    this.data = data;
    this.hp = data.hp;
    this.maxHp = data.hp;
    this.timer = 0;
  }

  update() {
    this.timer++;

    if (this.data.type === 'eco' && this.timer % SOLAR_INCOME_INTERVAL === 0) {
      game.sun += SOLAR_INCOME;
      spawnText(`+${SOLAR_INCOME}`, this.x + 40, this.y, 'gold');
    }

    if (this.data.type === 'shoot') {
      if (this.timer % this.data.rate === 0 && this._hasTarget()) {
        entities.projectiles.push(new Projectile(this.x + 60, this.y + 45, this.r, this.data));
      }
    }
  }

  _hasTarget() {
    return entities.enemies.some((e) => e.r === this.r && e.x > this.x);
  }

  draw() {
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.data.color;

    ctx.fillStyle = '#111';
    ctx.fillRect(this.x + 5, this.y + 5, GRID_SIZE - 10, GRID_SIZE - 10);

    ctx.fillStyle = 'white';
    ctx.font = '35px Arial';
    ctx.fillText(this.data.icon, this.x + 25, this.y + 55);

    // Health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x + 10, this.y + 75, 70, 4);
    ctx.fillStyle = '#0f0';
    ctx.fillRect(this.x + 10, this.y + 75, 70 * (this.hp / this.maxHp), 4);

    ctx.shadowBlur = 0;
  }
}
