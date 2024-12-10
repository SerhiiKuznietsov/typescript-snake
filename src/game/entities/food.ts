import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Food } from '../component/Food';
import { DebugFlag } from '../component/DebugFlag';

export const createFood = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Food);
  world.getComponent(entityId, Position).position.set(10, 1);
  world.getComponent(entityId, Collider, config.gridSize, config.gridSize);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = '#b93232';
  render.zIndex = 1;

  world.getComponent(entityId, DebugFlag);
};
