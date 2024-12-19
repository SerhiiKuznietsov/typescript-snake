import { World } from '@/ecs/World';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Respawn } from '../component/Respawn';
import { Hunter } from '../component/Hunter';
import { Target } from '../component/Target';
import { DebugFlag } from '../component/DebugFlag';
import { Movement } from '../component/Movement';
import { Direction } from '../component/Direction';

export const createHunter = (world: World, gridSize: number): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Hunter);
  world.getComponent(entityId, Direction);
  world.getComponent(entityId, Movement).moveInterval = 100;
  world.getComponent(entityId, Respawn).cooldown = 1000;
  world.getComponent(entityId, Respawn).elapsed = 1000;
  world.getComponent(entityId, Collider, gridSize, gridSize);
  world.getComponent(entityId, Target);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(gridSize);
  render.color = '#380070';
  render.zIndex = 1;

  world.getComponent(entityId, DebugFlag, true);
};
