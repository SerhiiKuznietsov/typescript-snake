import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './PlayerInputSystem';
import { MovementSystem } from './MovementSystem';
import { CollisionSystem } from './CollisionSystem';
import { RenderSystem } from './RenderSystem';

// import { TailGrowthSystem } from './tailGrowthSystem';
// import { FollowSystem } from './followSystem';

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  world
    .addSystem(new PlayerInputSystem(world))
    .addSystem(new MovementSystem(world))
    .addSystem(new CollisionSystem(world))
    .addSystem(new RenderSystem(world, board));
};
