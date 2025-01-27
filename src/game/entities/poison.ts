import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createPoison = (w: World, gridSize: number): void => {
  const entityId = w.createEntity();

  w.getComponent(entityId, 'Poison');
  w.getComponent(entityId, 'Respawn', { cooldown: 10000 });
  w.getComponent(entityId, 'Collider', {
    width: gridSize,
    height: gridSize,
  });

  w.getComponent(entityId, 'Render', {
    shape: new Square(gridSize),
    color: '#6f41c5',
  });
};
