import { World } from '@/ecs/World';

export const createPoison = (w: World): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Poison');
  w.getComponent(entity, 'Respawn', { cooldown: 5000 });
  w.getComponent(entity, 'RespawnСooldown', { remainingTime: 10000 });
  w.getComponent(entity, 'Render', {
    color: '#6f41c5',
  });
};
