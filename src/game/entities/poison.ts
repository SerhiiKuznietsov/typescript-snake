import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';

export const createPoison = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.addComponent(entityId, Position).position.set(10, 0);
  world.addComponent(entityId, Collider, config.gridSize, config.gridSize);

  const render = world.addComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'purple';
  render.zIndex = 1;
};
