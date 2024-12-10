import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Direction } from '../component/Direction';
import { Square } from '../geometry/shape/square';
import { Velocity } from '../component/Velocity';
import { Collider } from '../component/Collider';

export const createSnakeHead = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Position);
  world.getComponent(entityId, Velocity, 1);
  world.getComponent(entityId, Direction);
  world.getComponent(entityId, Collider);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'green';
  render.zIndex = 2;
};
