import { Entity } from '@/ecs/entity';
import { World } from '@/ecs/world';
import { GameConfig } from '../config/game';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { Health } from '../component/health';
import { Square } from '../geometry/shape/square';
import { Respawn } from '../component/respawn';
import { TakeDamage } from '../component/takeDamage';

export const createFood = (world: World, config: GameConfig): Entity => {
  const entity = world
    .createEntity()
    .add(Location)
    .add(Render)
    .add(Health)
    .add(Respawn)
    .add(TakeDamage);

  const render = entity.get(Render);
  render.shape = new Square(config.gridSize);
  render.color = 'red';
  render.zIndex = 1;

  return entity;
};
