import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Food } from '../component/Food';
import { DebugFlag } from '../component/DebugFlag';
import { Respawn } from '../component/Respawn';

export const createFood = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Food);
  world.getComponent(entityId, Position).x = 4;
  world.getComponent(entityId, Position).y = 1;
  world.getComponent(entityId, Respawn).cooldown = 1000;

  world.getComponent(entityId, Collider, config.gridSize, config.gridSize);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = '#c04d4d';
  render.zIndex = 1;

  world.getComponent(entityId, DebugFlag);
};
