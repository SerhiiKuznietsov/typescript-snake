import { World } from '@/ecs/World';

export const createHunter = (w: World): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Hunter');
  w.getComponent(entity, 'Attacker');
  w.getComponent(entity, 'Direction');
  w.getComponent(entity, 'Movement', { moveInterval: 100 });
  w.getComponent(entity, 'Respawn', { cooldown: 1000 });
  w.getComponent(entity, 'CollisionHandler');
  w.getComponent(entity, 'Render', {
    color: '#380070',
  });
};
