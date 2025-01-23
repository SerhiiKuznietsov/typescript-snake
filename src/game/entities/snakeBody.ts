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
  const entityId = w.createEntity();

  w.getComponent(entityId, 'SnakeBody', { head, next });
  w.getComponent(entityId, 'Position', { x: position.x, y: position.y });
  w.getComponent(entityId, 'Collider', {
    width: gridSize,
    height: gridSize,
  });
  w.getComponent(entityId, 'Render', {
    shape: new Square(gridSize),
    color: '#176639',
    zIndex: 2,
  });

  return entityId;
};
