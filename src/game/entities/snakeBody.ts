import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';
import { EntityId } from '@/ecs/Entity';

export const createSnakeBody = (w: World, gridSize: number): EntityId => {
  const entityId = w.createEntity();

  w.getComponent(entityId, 'SnakeBody');
  w.getComponent(entityId, 'Position');
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
