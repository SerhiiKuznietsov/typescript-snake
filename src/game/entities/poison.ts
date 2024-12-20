import { World } from '@/ecs/World';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Poison } from '../component/Poison';
import { Respawn } from '../component/Respawn';

export const createPoison = (world: World, gridSize: number): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Poison);
  world.getComponent(entityId, Respawn, { cooldown: 10000 });
  world.getComponent(entityId, Collider, { width: gridSize, height: gridSize });

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(gridSize);
  render.color = '#6f41c5';
  render.zIndex = 1;
};
