import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createSnake = (w: World, gridSize: number): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'PlayerInput');
  w.getComponent(entity, 'Snake');
  w.getComponent(entity, 'Reborn');
  w.getComponent(entity, 'SnakeBody', { head: entity });
  w.getComponent(entity, 'Attacker');
  w.getComponent(entity, 'Position', { x: 0, y: 0 });
  w.getComponent(entity, 'Movement', { moveInterval: 100 });
  w.getComponent(entity, 'Velocity', { value: 1 });
  w.getComponent(entity, 'Direction');
  w.getComponent(entity, 'CollisionHandler');
  w.getComponent(entity, 'Render', {
    shape: new Square(gridSize),
    color: '#1fa224',
  });
};
