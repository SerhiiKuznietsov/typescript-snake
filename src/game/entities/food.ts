import { World } from '@/ecs/World';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Food } from '../component/Food';
import { Respawn } from '../component/Respawn';

export const createFood = (world: World, gridSize: number): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Food);
  world.getComponent(entityId, Respawn, { cooldown: 1000, elapsed: 1000 });
  world.getComponent(entityId, Collider, { width: gridSize, height: gridSize });

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(gridSize);
  render.color = '#c04d4d';
  render.zIndex = 1;
};
