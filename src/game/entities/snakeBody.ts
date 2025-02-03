import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';
import { EntityId } from '@/ecs/Entity';
import { Vector2 } from '../geometry/vector2';

export const createSnakeBody = (
  w: World,
  gridSize: number,
  position: Vector2,
  head: EntityId,
  next: EntityId
): EntityId => {
  const entity = w.createEntity();

  w.getComponent(entity, 'SnakeBody', { head, next });
  w.getComponent(entity, 'Reborn');
  w.getComponent(entity, 'Position', { x: position.x, y: position.y });
  w.getComponent(entity, 'Render', {
    shape: new Square(gridSize),
    color: '#176639',
  });

  return entity;
};
