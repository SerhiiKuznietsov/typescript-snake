import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { createFood } from './food';
import { createPoison } from './poison';

export const initEntities = (world: World, config: GameConfig) => {
  createFood(world, config);
  createPoison(world, config);

  // TODO - createHunter();
  // const hunter = new Entity('hunter');
};
