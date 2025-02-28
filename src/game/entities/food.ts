import { World } from '@/ecs/World';

export const createFood = (w: World, size: number): void => {
  const entity = w.createEntity();

  w.getComponent(entity, 'Food');
  w.getComponent(entity, 'Respawn', { cooldown: 200, elapsed: 200 });
  w.getComponent(entity, 'Render', {
    color: '#c04d4d',
    size,
  });
};
