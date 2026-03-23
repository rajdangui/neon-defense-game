# Neon Defense

A fast-paced **2D tower defense game** built with **vanilla JavaScript** and the **Canvas 2D API**.
Place towers, manage resources, and defend your base against seven escalating waves of neon enemies.

> 🎮 **[Play it live on GitHub Pages](https://rajdangui.github.io/neon-defense-game/)**

---

## 🎮 Gameplay

Stop incoming enemy waves by placing defensive towers on the grid.
Balance your economy, choose the right tower combinations, and survive increasingly difficult waves.

### Core Gameplay Loop

1. Enemies spawn in waves from the right side of the screen.
2. Click a tower card in the shop to select it, then click a grid cell to place it.
3. Towers automatically attack enemies in their row.
4. Destroyed enemies and wave clears reward currency.
5. Survive all **7 waves** to win — including the final boss!

---

## ✨ Features

* ⚡ Real-time tower defense gameplay at 60 FPS
* 🧠 8 unique tower types with distinct abilities
* 🌊 7 progressive enemy waves with a final boss
* 💰 Economy system — earn currency to place more towers
* ❄️ Status effects — ice towers slow enemies
* 💥 Area-of-effect splash damage (Plasma tower)
* 💣 One-shot mine traps
* 🎨 Neon-styled glow effects and particle system

---

## 🗼 Tower Types

| Tower  | Cost | HP  | Ability                                |
| ------ | ---- | --- | -------------------------------------- |
| 🌻 Solar  | 50   | 50  | Generates +25 currency every ~6 s      |
| 🔫 Pea    | 100  | 100 | Balanced damage and attack speed       |
| 🧱 Wall   | 50   | 600 | High-HP blocker — no attack            |
| ❄️ Ice    | 175  | 100 | Slows enemies on hit                   |
| 💣 Mine   | 150  | 10  | One-shot explosion (500 dmg)           |
| 🔭 Sniper | 300  | 80  | High single-target damage, slow fire   |
| ⚡ Rapid  | 250  | 100 | Very fast fire rate, lower per-shot dmg |
| ⚛️ Plasma | 450  | 150 | Splash damage hitting nearby enemies   |

---

## 🛠 Tech Stack

| Layer            | Technology                    |
| ---------------- | ----------------------------- |
| Language         | Vanilla JavaScript (ES2022 modules) |
| Rendering        | Canvas 2D API                 |
| Build system     | [Vite](https://vitejs.dev/)   |
| Linting          | [ESLint](https://eslint.org/) |
| Testing          | [Vitest](https://vitest.dev/) |
| CI / CD          | GitHub Actions                |
| Hosting          | GitHub Pages                  |

---

## 📂 Project Structure

```
neon-defense-game/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint → Test → Build on every push / PR
│       └── deploy.yml      # Deploy to GitHub Pages on push to main
├── src/
│   ├── __tests__/
│   │   ├── constants.test.js
│   │   └── data.test.js
│   ├── constants.js        # Numeric game constants
│   ├── data.js             # PLANTS and WAVES definitions
│   ├── state.js            # Mutable game state
│   ├── canvas.js           # Canvas / ctx singleton
│   ├── particles.js        # Particle & floating-text system
│   ├── Plant.js            # Plant class
│   ├── Enemy.js            # Enemy class
│   ├── Projectile.js       # Projectile class
│   ├── ui.js               # Shop, HUD, input handler
│   ├── game.js             # Game loop & wave management
│   ├── main.js             # Entry point
│   └── style.css           # All styles
├── index.html              # HTML entry point
├── vite.config.js
├── vitest.config.js
├── eslint.config.js
├── .prettierrc.json
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajdangui/neon-defense-game.git
cd neon-defense-game
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173/neon-defense-game/](http://localhost:5173/neon-defense-game/) in your browser.

---

## 🧪 Testing & Linting

```bash
npm test          # Run unit tests (Vitest)
npm run lint      # Lint source files (ESLint)
npm run lint:fix  # Auto-fix lint issues
```

---

## 📦 Build for Production

```bash
npm run build     # Outputs to dist/
npm run preview   # Preview the production build locally
```

---

## 🎯 Future Improvements

* Tower selling / refunding
* Pause button and settings screen
* Sound effects and background music
* Mobile-responsive layout
* Leaderboard / high-score system
* Additional maps and enemy types

---

## 👨‍💻 Author

**Raj Dangui**

* GitHub: <https://github.com/rajdangui>
* LinkedIn: <https://www.linkedin.com/in/rajdangui>

---

## 📄 License

This project is open source and available under the **MIT License**.

