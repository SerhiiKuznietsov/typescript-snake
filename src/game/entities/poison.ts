import { World } from '@/ecs/World';

export const createPoison = (w: World, size: number): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Poison');
  w.getComponent(entity, 'Respawn', { cooldown: 10000 });
  w.getComponent(entity, 'Render', {
    color: '#6f41c5',
    size,
  });
};
