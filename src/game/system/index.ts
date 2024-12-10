import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './PlayerInputSystem';
import { MovementSystem } from './MovementSystem';
import { CollisionSystem } from './CollisionSystem';
import { RenderSystem } from './RenderSystem';
import { AttackFoodSystem } from './attackFoodSystem';

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  world
    .addSystem(new PlayerInputSystem(world))
    .addSystem(new MovementSystem(world))
    .addSystem(new CollisionSystem(world))
    .addSystem(new AttackFoodSystem(world))
    .addSystem(new RenderSystem(world, board));
};
