import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { Poison } from '../component/Poison';
import { DebugFlag } from '../component/DebugFlag';
import { Respawn } from '../component/Respawn';

export const createPoison = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Poison);
  world.getComponent(entityId, Position).x = 10;
  world.getComponent(entityId, Position).y = 10;
  world.getComponent(entityId, Respawn).cooldown = 10000;
  world.getComponent(entityId, Collider, config.gridSize, config.gridSize);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = '#6f41c5';
  render.zIndex = 1;

  world.getComponent(entityId, DebugFlag);
};
