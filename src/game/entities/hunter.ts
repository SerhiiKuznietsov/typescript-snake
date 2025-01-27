import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createHunter = (w: World, gridSize: number): void => {
  const entityId = w.createEntity();

  w.getComponent(entityId, 'Hunter');
  w.getComponent(entityId, 'Attacker');
  w.getComponent(entityId, 'Direction');
  w.getComponent(entityId, 'Movement', { moveInterval: 100 });
  w.getComponent(entityId, 'Respawn', { cooldown: 1000, elapsed: 1000 });
  w.getComponent(entityId, 'CollisionHandler');
  w.getComponent(entityId, 'Render', {
    shape: new Square(gridSize),
    color: '#380070',
  });

  w.getComponent(entityId, 'DebugFlag', { isOpen: true });
};
