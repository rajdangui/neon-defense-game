# Neon Defense Game

A fast-paced **3D tower defense game built with React, Three.js, and TypeScript**.
Players must strategically place towers, manage resources, and defend their base against waves of enemies in a neon-styled battlefield.

---

## 🎮 Gameplay

Neon Defense is a strategy-based tower defense game where players must stop incoming enemy waves by placing different types of defensive towers.

Each tower has unique abilities and strengths. Players must balance their economy, choose the right tower combinations, and upgrade defenses to survive increasingly difficult waves.

### Core Gameplay Loop

1. Enemies spawn in waves.
2. Players place towers on the map.
3. Towers automatically attack enemies.
4. Destroyed enemies reward the player with currency.
5. Players upgrade or build new towers to survive stronger waves.

---

## ✨ Features

* ⚡ Real-time tower defense gameplay
* 🧠 Strategic tower placement system
* 💥 Multiple tower types with unique abilities
* 🌊 Progressive enemy wave system
* 💰 Economy system with tower upgrades and selling
* 🎨 Neon-styled 3D environment
* 🖥 Interactive UI and in-game HUD

---

## 🗼 Tower Types

| Tower            | Ability                          |
| ---------------- | -------------------------------- |
| Pulse Cannon     | Balanced damage and attack speed |
| Flux Emitter     | Fast attack speed                |
| Phase Driver     | Long-range sniper tower          |
| Cryo Projector   | Slows down enemies               |
| Missile Launcher | Area damage to multiple enemies  |

---

## 🛠 Tech Stack

**Frontend**

* React
* TypeScript
* Vite

**3D Rendering**

* Three.js
* @react-three/fiber

**Styling**

* Tailwind CSS

**Development Tools**

* ESLint
* Prettier

---

## 📂 Project Structure

```
src
 ├── components
 │    ├── UI.tsx
 │
 ├── game
 │    ├── GameCanvas.tsx
 │    ├── GameState.tsx
 │
 ├── constants.ts
 ├── types.ts
```

**Key Files**

* `GameCanvas.tsx` → Main 3D rendering and game scene
* `GameState.tsx` → Global game state and logic
* `UI.tsx` → Game HUD and interface

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajdangui/neon-defense-game.git
```

### 2. Navigate into the project

```bash
cd neon-defense-game
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

The game will run locally at:

```
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

---

## 🎯 Future Improvements

* Additional maps and environments
* Boss enemy waves
* Tower upgrade system expansion
* Leaderboards
* Player progression system
* Multiplayer / co-op mode

---

## 👨‍💻 Author

**Raj Dangui**

GitHub:
https://github.com/rajdangui

LinkedIn:
https://www.linkedin.com/in/rajdangui

---

## 📄 License

This project is open source and available under the **MIT License**.

---
