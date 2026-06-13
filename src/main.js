import { Game } from './core/Game.js';
import { UIManager } from './ui/UIManager.js';

const game = new Game();
const ui = new UIManager(game);

game.setUI(ui);
ui.showLoading();

window.addEventListener('load', async () => {
  await game.init();
  document.getElementById('loading-screen').classList.add('hidden');
  ui.showMainMenu();
});

window.addEventListener('resize', () => game.onResize());
document.addEventListener('visibilitychange', () => {
  if (document.hidden) game.pause();
});
