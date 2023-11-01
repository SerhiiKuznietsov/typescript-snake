import { SnakeGame } from './game/game';

const game = new SnakeGame();

game.init();
game.start();



// (async () => {
//   const file = new FileLoader();
//   const result = await file.loadAsync('snake.vox');

//   console.log(result);

// })();