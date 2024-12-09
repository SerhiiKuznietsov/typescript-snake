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

export const createSnakeHead = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.addComponent(entityId, PlayerInput);
  world.addComponent(entityId, Position).position.set(1, 1);
  world.addComponent(entityId, Movement, 5);
  world.addComponent(entityId, Velocity, 1);
  world.addComponent(entityId, Direction);
  world.addComponent(entityId, Collider);
  world.addComponent(entityId, CollisionOpponent);

  const render = world.addComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'lightgreen';
  render.zIndex = 2;
};
