import { World } from '@/ecs/World';
import { Square } from '../geometry/shape/square';

export const createHunter = (w: World, gridSize: number): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Hunter');
  w.getComponent(entity, 'Attacker');
  w.getComponent(entity, 'Direction');
  w.getComponent(entity, 'Movement', { moveInterval: 100 });
  w.getComponent(entity, 'Respawn', { cooldown: 1000, elapsed: 1000 });
  w.getComponent(entity, 'CollisionHandler');
  w.getComponent(entity, 'Render', {
    shape: new Square(gridSize),
    color: '#380070',
  });

  w.getComponent(entity, 'DebugFlag', { isOpen: true });
};
