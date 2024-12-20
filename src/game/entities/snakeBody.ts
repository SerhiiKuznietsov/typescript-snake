import { World } from '@/ecs/World';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { EntityId } from '@/ecs/Entity';
import { SnakeBody } from '../component/SnakeBody';
import { DebugFlag } from '../component/DebugFlag';

export const createSnakeBody = (world: World, gridSize: number): EntityId => {
  const entityId = world.createEntity();

  world.getComponent(entityId, SnakeBody);
  world.getComponent(entityId, Position);
  world.getComponent(entityId, Collider, { width: gridSize, height: gridSize });

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(gridSize);
  render.color = '#176639';
  render.zIndex = 2;

  return entityId;
};
