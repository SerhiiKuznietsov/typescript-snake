import { Entity } from '@/ecs/entity';
import { World } from '@/ecs/world';
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

export const createPlayer = (world: World, config: GameConfig): Entity => {
  const entity = world
    .createEntity()
    .add(Location)
    .add(Movement)
    .add(Render)
    .add(Health)
    .add(Attack)
    .add(Damage)
    .add(DirectionControl)
    .add(Teleport)
    .add(CollisionOpponent)
    .add(Tail);

  entity.get(Damage).damage = 1;

  const render = entity.get(Render);
  render.shape = new Square(config.gridSize);
  render.color = 'lightgreen';
  render.zIndex = 2;

  return entity;
};
