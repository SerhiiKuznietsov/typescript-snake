import { World } from '@/ecs/World';

export const createFood = (w: World): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Food');
  w.getComponent(entity, 'Respawn', { cooldown: 1000 });
  w.getComponent(entity, 'RespawnСooldown', { remainingTime: -1 });
  w.getComponent(entity, 'Render', {
    color: '#c04d4d',
  });
};
