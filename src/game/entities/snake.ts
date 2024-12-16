import { World } from '@/ecs/World';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { Collider } from '../component/Collider';
import { PlayerInput } from '../component/PlayerInput';
import { Snake } from '../component/Snake';
import { Position } from '../component/Position';
import { Movement } from '../component/Movement';
import { Velocity } from '../component/Velocity';
import { Direction } from '../component/Direction';
import { CollisionOpponent } from '../component/CollisionOpponent';
import { DebugFlag } from '../component/DebugFlag';

export const createSnake = (world: World, gridSize: number): void => {
  const entityId = world.createEntity();

  world.getComponent(entityId, PlayerInput);
  world.getComponent(entityId, Snake);
  world.getComponent(entityId, Position, 0, 0);
  world.getComponent(entityId, Movement, 1);
  world.getComponent(entityId, Velocity, 1);
  world.getComponent(entityId, Direction);
  world.getComponent(entityId, Collider);
  world.getComponent(entityId, CollisionOpponent);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(gridSize);
  render.color = '#1fa224';
  render.zIndex = 3;

  world.getComponent(entityId, DebugFlag);
};
