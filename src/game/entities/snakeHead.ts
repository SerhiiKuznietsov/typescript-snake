import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Movement } from '../component/Movement';
import { Render } from '../component/Render';
import { Direction } from '../component/Direction';
import { CollisionOpponent } from '../component/CollisionOpponent';
import { Square } from '../geometry/shape/square';
import { PlayerInput } from '../component/PlayerInput';
import { Velocity } from '../component/Velocity';
import { Collider } from '../component/Collider';
import { DebugFlag } from '../component/DebugFlag';

export const createSnakeHead = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, PlayerInput);
  world.getComponent(entityId, Position, 1, 1);
  world.getComponent(entityId, Movement, 5);
  world.getComponent(entityId, Velocity, 1);
  world.getComponent(entityId, Direction);
  world.getComponent(entityId, Collider);
  world.getComponent(entityId, CollisionOpponent);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = '#1fa224';
  render.zIndex = 2;

  world.getComponent(entityId, DebugFlag);
};
