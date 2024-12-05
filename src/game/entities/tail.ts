import { Entity } from '@/ecs/entity';
import { World } from '@/ecs/world';
import { GameConfig } from '../config/game';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { Health } from '../component/health';
import { Square } from '../geometry/shape/square';
import { Respawn } from '../component/respawn';
import { Vector2 } from '../geometry/vector2';
import { Follow } from '../component/follow';

export const createTail = (
  world: World,
  config: GameConfig,
  newPosition: Vector2,
  followSegment: Entity
): Entity => {
  const entity = world
    .createEntity()
    .add(Location)
    .add(Render)
    .add(Health)
    .add(Respawn)
    .add(Follow);

  const render = entity.get(Render);
  render.shape = new Square(config.gridSize);
  render.color = 'black';
  render.zIndex = 2;

  entity.get(Location).position.setVector(newPosition);
  entity.get(Follow).targetEntity = followSegment;

  return entity;
};
