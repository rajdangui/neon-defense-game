/**
 * Plant / tower definitions.
 * @type {Array<{id:number, name:string, cost:number, hp:number, icon:string,
 *               color:string, cd:number, type:string, dmg?:number,
 *               rate?:number, effect?:string}>}
 */
export const PLANTS = [
  { id: 0, name: 'Solar',  cost: 50,  hp: 50,  icon: '🌻', color: '#ffd700', cd: 500,  type: 'eco'   },
  { id: 1, name: 'Pea',    cost: 100, hp: 100, icon: '🔫', color: '#00f3ff', cd: 0,    type: 'shoot', dmg: 20,  rate: 90  },
  { id: 2, name: 'Wall',   cost: 50,  hp: 600, icon: '🧱', color: '#cd7f32', cd: 1000, type: 'wall'  },
  { id: 3, name: 'Ice',    cost: 175, hp: 100, icon: '❄️', color: '#aaddff', cd: 500,  type: 'shoot', dmg: 15,  rate: 100, effect: 'slow'   },
  { id: 4, name: 'Mine',   cost: 150, hp: 10,  icon: '💣', color: '#ff0000', cd: 2000, type: 'mine',  dmg: 500  },
  { id: 5, name: 'Sniper', cost: 300, hp: 80,  icon: '🔭', color: '#00ff00', cd: 2000, type: 'shoot', dmg: 150, rate: 300 },
  { id: 6, name: 'Rapid',  cost: 250, hp: 100, icon: '⚡', color: '#bc13fe', cd: 500,  type: 'shoot', dmg: 15,  rate: 25  },
  { id: 7, name: 'Plasma', cost: 450, hp: 150, icon: '⚛️', color: '#ffffff', cd: 3000, type: 'shoot', dmg: 60,  rate: 150, effect: 'splash' },
];

/**
 * Wave definitions.
 * @type {Array<{count:number, hp:number, speed:number, interval:number, label:string}>}
 */
export const WAVES = [
  { count: 8,  hp: 80,   speed: 0.4, interval: 400, label: 'Tutorial'   },
  { count: 12, hp: 100,  speed: 0.5, interval: 350, label: 'Warmup'     },
  { count: 18, hp: 120,  speed: 0.6, interval: 300, label: 'Real Start' },
  { count: 25, hp: 150,  speed: 0.7, interval: 200, label: 'Swarm'      },
  { count: 5,  hp: 800,  speed: 0.3, interval: 600, label: 'Tanks'      },
  { count: 40, hp: 200,  speed: 0.9, interval: 150, label: 'Chaos'      },
  { count: 1,  hp: 5000, speed: 0.2, interval: 100, label: 'Final Boss' },
];
