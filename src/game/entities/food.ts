import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Food } from '../component/Food';

export const createFood = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.addComponent(entityId, Food);
  world.addComponent(entityId, Position).position.set(10, 1);
  world.addComponent(entityId, Collider, config.gridSize, config.gridSize);

  const render = world.addComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'red';
  render.zIndex = 1;
};
