import { Game } from './core/Game.js';
import { UIManager } from './ui/UIManager.js';

const game = new Game();
const ui = new UIManager(game);
game.setUI(ui);

const introScreen = document.getElementById('intro-screen');
const loadingScreen = document.getElementById('loading-screen');

setTimeout(() => {
  introScreen.classList.add('hidden');
  loadingScreen.classList.remove('hidden');
  ui.showLoading();

  game.init().then(() => {
    loadingScreen.classList.add('hidden');
    ui.showMainMenu();
  });
}, 4500);

window.addEventListener('resize', () => game.onResize());
document.addEventListener('visibilitychange', () => {
  if (document.hidden) game.pause();
});
