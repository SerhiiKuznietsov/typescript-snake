import { World } from '@/ecs/World';
import { EntityId } from '@/ecs/Entity';
import { Vector2 } from '../geometry/vector2';

export const createSnakeBody = (
  w: World,
  { x, y }: Vector2,
  head: EntityId,
  next: EntityId
): EntityId => {
  const entity = w.createEntity();

  w.getComponent(entity, 'SnakeBody', { head, next });
  w.getComponent(entity, 'Reborn');
  w.getComponent(entity, 'RespawnPosition', { x, y });
  w.getComponent(entity, 'Render', {
    color: '#176639',
  });

  return entity;
};
