import { ctx, canvas } from './canvas.js';
import { game, entities, resetState } from './state.js';
import { WAVES } from './data.js';
import { Enemy } from './Enemy.js';
import { updateParticles } from './particles.js';
import { initShop, updateShop, updateHUD, showNextWaveBtn, showWaveAnnouncement } from './ui.js';
import { OFFSET_X, OFFSET_Y, GRID_SIZE, COLS, ROWS } from './constants.js';

// ---------------------------------------------------------------------------
// Game lifecycle
// ---------------------------------------------------------------------------

/** Initialise / restart the game. */
export function startGame() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('gameover-screen').classList.add('hidden');
  document.getElementById('win-screen').classList.add('hidden');
  document.getElementById('hud').classList.remove('hidden');

  resetState();
  initShop();
  showNextWaveBtn();
  loop();
}

/** Start the next wave (called from the button). */
export function startNextWave() {
  if (game.wave >= WAVES.length) {
    document.getElementById('win-screen').classList.remove('hidden');
    game.active = false;
    return;
  }

  document.getElementById('next-wave-btn').style.display = 'none';

  const w = WAVES[game.wave];
  game.enemiesToSpawn = w.count;
  game.waveInProgress = true;
  game.wave++;

  showWaveAnnouncement(`WAVE ${game.wave} — ${w.label.toUpperCase()}`);
}

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------

function loop() {
  if (!game.active) return;
  game.frame++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Wave spawning logic
  if (game.waveInProgress) {
    const wConfig = WAVES[game.wave - 1];

    if (game.enemiesToSpawn > 0) {
      game.spawnTimer++;
      if (game.spawnTimer > wConfig.interval) {
        const row = Math.floor(Math.random() * ROWS);
        entities.enemies.push(new Enemy(row, wConfig));
        game.enemiesToSpawn--;
        game.spawnTimer = 0;
      }
    } else if (entities.enemies.length === 0) {
      // Wave cleared
      game.waveInProgress = false;
      game.sun += 100;
      showWaveAnnouncement('WAVE COMPLETE! +100 SUN');
      showNextWaveBtn();
    }
  }

  // 2. Entity updates
  entities.plants = entities.plants.filter((p) => p.hp > 0);
  entities.plants.forEach((p) => p.update());

  entities.enemies = entities.enemies.filter((e, i) => {
    const shouldRemove = e.update();
    if (shouldRemove) entities.enemies.splice(i, 1);
    return !shouldRemove && e.hp > 0;
  });

  entities.projectiles.forEach((p) => p.update());
  entities.projectiles = entities.projectiles.filter((p) => !p.dead);

  // 3. Rendering — grid
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      ctx.strokeRect(OFFSET_X + c * GRID_SIZE, OFFSET_Y + r * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }

  entities.plants.forEach((p) => p.draw());
  entities.enemies.forEach((e) => e.draw());
  entities.projectiles.forEach((p) => p.draw());

  updateParticles();

  // 4. HUD + shop updates
  updateHUD();
  updateShop();

  // 5. Game-over check
  if (game.hp <= 0) {
    game.active = false;
    document.getElementById('gameover-screen').classList.remove('hidden');
    document.getElementById('final-stats').innerText =
      `You survived ${game.wave - 1} wave${game.wave - 1 !== 1 ? 's' : ''}.`;
    return;
  }

  requestAnimationFrame(loop);
}
