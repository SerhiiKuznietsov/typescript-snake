import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { createPlayer } from './player';
import { createFood } from './food';

export const initEntities = (world: World, config: GameConfig) => {
  createPlayer(world, config);
  createFood(world, config);

  // TODO
  // const poison = new Entity('poison'); // purple
  // const hunter = new Entity('hunter');
};
