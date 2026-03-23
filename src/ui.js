import { PLANTS } from './data.js';
import { game, entities, selection, plantCooldowns } from './state.js';
import { Plant } from './Plant.js';
import { OFFSET_X, OFFSET_Y, GRID_SIZE, COLS, ROWS } from './constants.js';

// ---------------------------------------------------------------------------
// Shop
// ---------------------------------------------------------------------------

/** Build the shop panel cards from the PLANTS data. */
export function initShop() {
  const panel = document.getElementById('shop-panel');
  panel.innerHTML = '';
  PLANTS.forEach((plant, i) => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.onclick = () => selectCard(i);
    card.id = `card-${i}`;
    card.innerHTML = `
      <div class="card-icon">${plant.icon}</div>
      <div class="card-name">${plant.name}</div>
      <div class="card-cost">${plant.cost}</div>
      <div class="cooldown-overlay" id="cd-${i}"></div>
    `;
    panel.appendChild(card);
  });
}

/**
 * Select a plant card, if affordable and not on cooldown.
 * @param {number} index
 */
export function selectCard(index) {
  if (plantCooldowns[index] > 0 || game.sun < PLANTS[index].cost) return;
  selection.index = index;
  document.querySelectorAll('.plant-card').forEach((c) => c.classList.remove('selected'));
  document.getElementById(`card-${index}`).classList.add('selected');
}

/** Update card visuals each frame (cooldown overlays + affordability lock). */
export function updateShop() {
  PLANTS.forEach((p, i) => {
    const card = document.getElementById(`card-${i}`);
    const overlay = document.getElementById(`cd-${i}`);
    if (!card || !overlay) return;

    if (plantCooldowns[i] > 0) {
      plantCooldowns[i]--;
      const percent = (plantCooldowns[i] / (p.cd / 16)) * 100;
      overlay.style.height = `${percent}%`;
      card.classList.add('locked');
    } else {
      overlay.style.height = '0%';
      if (game.sun < p.cost) card.classList.add('locked');
      else card.classList.remove('locked');
    }
  });
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------

/** Refresh the HUD stat displays. */
export function updateHUD() {
  document.getElementById('sun-display').innerText = Math.floor(game.sun);
  document.getElementById('hp-display').innerText = game.hp;
  document.getElementById('enemies-display').innerText =
    entities.enemies.length + game.enemiesToSpawn;
  document.getElementById('wave-display').innerText = game.wave;
}

/** Show or hide the "Start Next Wave" button. */
export function showNextWaveBtn() {
  const btn = document.getElementById('next-wave-btn');
  btn.style.display = 'block';
  btn.innerText = game.wave === 0 ? 'START GAME' : 'START NEXT WAVE';
}

/** Show a wave announcement banner. */
export function showWaveAnnouncement(text) {
  const ann = document.getElementById('wave-announcement');
  ann.innerText = text;
  ann.style.opacity = '1';
  setTimeout(() => (ann.style.opacity = '0'), 2000);
}

// ---------------------------------------------------------------------------
// Canvas click — plant placement
// ---------------------------------------------------------------------------

import { canvas } from './canvas.js';

canvas.addEventListener('click', (e) => {
  if (!game.active || selection.index === -1) return;

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const inGrid =
    mx > OFFSET_X &&
    mx < OFFSET_X + COLS * GRID_SIZE &&
    my > OFFSET_Y &&
    my < OFFSET_Y + ROWS * GRID_SIZE;

  if (!inGrid) return;

  const col = Math.floor((mx - OFFSET_X) / GRID_SIZE);
  const row = Math.floor((my - OFFSET_Y) / GRID_SIZE);

  if (entities.plants.some((p) => p.c === col && p.r === row)) return;

  const plantData = PLANTS[selection.index];
  if (game.sun < plantData.cost) return;

  entities.plants.push(new Plant(col, row, plantData));
  game.sun -= plantData.cost;
  plantCooldowns[selection.index] = plantData.cd / 16;

  selection.index = -1;
  document.querySelectorAll('.plant-card').forEach((el) => el.classList.remove('selected'));
});

// Right-click cancels selection
canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  selection.index = -1;
  document.querySelectorAll('.plant-card').forEach((c) => c.classList.remove('selected'));
});
