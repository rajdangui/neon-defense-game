import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
