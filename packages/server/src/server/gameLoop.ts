const TICK_RATE = 15;
const TICK_LENGTH_MS: number = 1000 / TICK_RATE;
let tick = 0;

/**
 * Gets process.hrtime converted to milliseconds
 * @returns hrTimeMs - process.hrtime in milliseconds
 */
function hrtimeMs(): number {
  const time = process.hrtime();
  return time[0] * 1000 + time[1] / 1000000;
}

let previous = hrtimeMs();

/**
 * Runs the game loop calling a mandatory callback for the updates containing
 * the delta time value and the current tick (optional)
 * @param update - callback function to handle your game update
 */
function gameLoop(update: (delta: number, tick?: number) => void): void {
  setTimeout(gameLoop, TICK_LENGTH_MS, update);
  const now: number = hrtimeMs();
  const delta: number = (now - previous) / 100;
  previous = now;
  tick += 1;
  update(delta, tick);
}

export default gameLoop;
