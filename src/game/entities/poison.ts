import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createPoison = (w: World, gridSize: number): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Poison');
  w.getComponent(entity, 'Respawn', { cooldown: 10000 });
  w.getComponent(entity, 'Render', {
    shape: new Square(gridSize),
    color: '#6f41c5',
  });
};
