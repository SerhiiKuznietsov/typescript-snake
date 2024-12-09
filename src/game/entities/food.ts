import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Location } from '../component/location';
import { Render } from '../component/render';
import { Health } from '../component/health';
import { Square } from '../geometry/shape/square';
import { Respawn } from '../component/respawn';
import { TakeDamage } from '../component/takeDamage';
import { CollisionOpponent } from '../component/collisionOpponent';

export const createFood = (world: World, config: GameConfig): void => {
  const entityId = world.createEntity();

  world.addComponent(entityId, Location);
  world.addComponent(entityId, Render);
  world.addComponent(entityId, Health);
  world.addComponent(entityId, Respawn);
  world.addComponent(entityId, TakeDamage);
  world.addComponent(entityId, CollisionOpponent);

  const render = world.getComponent(entityId, Render);
  render.shape = new Square(config.gridSize);
  render.color = 'red';
  render.zIndex = 1;

  world.getComponent(entityId, Location).position.set(10, 0);
};
