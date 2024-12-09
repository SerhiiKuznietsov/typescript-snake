import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Position } from '../component/Position';
import { Movement } from '../component/Movement';
import { Render } from '../component/Render';
import { Direction } from '../component/Direction';
import { CollisionOpponent } from '../component/CollisionOpponent';
import { Square } from '../geometry/shape/square';

export const createSnakeHead = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.addComponent(entityId, Position);
  world.addComponent(entityId, Movement);
  world.addComponent(entityId, Direction);
  world.addComponent(entityId, CollisionOpponent);

  const render = world.addComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'lightgreen';
  render.zIndex = 2;
};
