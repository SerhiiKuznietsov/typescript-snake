import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Render } from '../component/Render';
import { Direction } from '../component/Direction';
import { Square } from '../geometry/shape/square';
import { Velocity } from '../component/Velocity';
import { Collider } from '../component/Collider';
import { DebugFlag } from '../component/DebugFlag';
import { EntityId } from '@/ecs/entity';

export const createSnakeBody = (world: World, config: GameConfig): EntityId => {
  const entityId = world.createEntity();

  world.getComponent(entityId, Position);
  world.getComponent(entityId, Velocity, 1);
  world.getComponent(entityId, Direction);
  world.getComponent(entityId, Collider);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = '#176639';
  render.zIndex = 2;

  return entityId;
};
