import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createFood = (w: World, gridSize: number): void => {
  const entityId = w.createEntity();

  w.getComponent(entityId, 'Food');
  w.getComponent(entityId, 'Respawn', { cooldown: 1000, elapsed: 1000 });
  w.getComponent(entityId, 'Collider', {
    width: gridSize,
    height: gridSize,
  });
  w.getComponent(entityId, 'Render', {
    shape: new Square(gridSize),
    color: '#c04d4d',
  });
};
