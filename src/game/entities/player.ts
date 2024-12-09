import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Location } from '../component/location';
import { Movement } from '../component/movement';
import { Render } from '../component/render';
import { Health } from '../component/health';
import { Attack } from '../component/attack';
import { Damage } from '../component/damage';
import { DirectionControl } from '../component/directionControl';
import { Teleport } from '../component/teleport';
import { CollisionOpponent } from '../component/collisionOpponent';
import { Square } from '../geometry/shape/square';
import { Tail } from '../component/tail';

export const createPlayer = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.addComponent(entityId, Location);
  world.addComponent(entityId, Movement);
  world.addComponent(entityId, Render);
  world.addComponent(entityId, Health);
  world.addComponent(entityId, Attack);
  world.addComponent(entityId, Damage);
  world.addComponent(entityId, DirectionControl);
  world.addComponent(entityId, Teleport);
  world.addComponent(entityId, CollisionOpponent);
  world.addComponent(entityId, Tail);

  world.getComponent(entityId, Damage).damage = 1;

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'lightgreen';
  render.zIndex = 2;
};
