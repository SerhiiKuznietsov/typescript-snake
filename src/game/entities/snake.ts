import { World } from '@/ecs/World';

export const createSnake = (w: World): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'KeyboardInput');
  w.getComponent(entity, 'Snake');
  w.getComponent(entity, 'Reborn');
  w.getComponent(entity, 'SnakeBody', { head: entity });
  w.getComponent(entity, 'Attacker');
  w.getComponent(entity, 'RespawnPosition', { x: 0, y: 0 });
  w.getComponent(entity, 'Movement', { moveInterval: 100 });
  w.getComponent(entity, 'Velocity', { value: 1 });
  w.getComponent(entity, 'Direction');
  w.getComponent(entity, 'CollisionHandler');
  w.getComponent(entity, 'Render', {
    color: '#1fa224',
  });
};
