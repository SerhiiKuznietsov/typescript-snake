import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createSnake = (w: World, gridSize: number): void => {
  const entityId = w.createEntity();

  w.getComponent(entityId, 'PlayerInput');
  w.getComponent(entityId, 'Snake');
  w.getComponent(entityId, 'Attacker');
  w.getComponent(entityId, 'Position', { x: 0, y: 0 });
  w.getComponent(entityId, 'Movement', { moveInterval: 100 });
  w.getComponent(entityId, 'Velocity', { value: 1 });
  w.getComponent(entityId, 'Direction');
  w.getComponent(entityId, 'CollisionHandler');
  w.getComponent(entityId, 'Collider', {
    width: gridSize,
    height: gridSize,
  });
  w.getComponent(entityId, 'Render', {
    shape: new Square(gridSize),
    color: '#1fa224',
    zIndex: 3,
  });
};
