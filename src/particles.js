import { entities } from './state.js';
import { ctx } from './canvas.js';

/**
 * Spawn a floating damage/currency text.
 * @param {string|number} txt
 * @param {number} x
 * @param {number} y
 * @param {string} color CSS color string
 */
export function spawnText(txt, x, y, color) {
  entities.texts.push({ t: txt, x, y, c: color, life: 40 });
}

/**
 * Spawn a burst of square particles.
 * @param {number} x
 * @param {number} y
 * @param {string} color CSS color string
 * @param {number} count Number of particles
 */
export function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    entities.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      c: color,
      life: 1.0,
    });
  }
}

/** Update and draw all particles and floating texts. */
export function updateParticles() {
  entities.particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.05;
    ctx.fillStyle = p.c;
    ctx.globalAlpha = p.life;
    ctx.fillRect(p.x, p.y, 4, 4);
    if (p.life <= 0) entities.particles.splice(i, 1);
  });
  ctx.globalAlpha = 1;

  entities.texts.forEach((t, i) => {
    t.y -= 0.5;
    t.life--;
    ctx.fillStyle = t.c;
    ctx.font = '20px Arial';
    ctx.fillText(t.t, t.x, t.y);
    if (t.life <= 0) entities.texts.splice(i, 1);
  });
}
