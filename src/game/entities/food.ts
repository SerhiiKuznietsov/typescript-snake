import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createFood = (w: World, gridSize: number): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Food');
  w.getComponent(entity, 'Respawn', { cooldown: 1000, elapsed: 1000 });
  w.getComponent(entity, 'Render', {
    shape: new Square(gridSize),
    color: '#c04d4d',
  });
};
