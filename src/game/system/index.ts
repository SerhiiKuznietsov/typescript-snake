import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { DirectionControlSystem } from './directionControlSystem';
import { MovementSystem } from './movementSystem';
import { TeleportSystem } from './teleportSystem';
import { CollisionSystem } from './collisionSystem';
import { AttackSystem } from './attackSystem';
import { DamageSystem } from './damageSystem';
import { HealthSystem } from './healthSystem';
import { SpawnSystem } from './spawnSystem';
import { RenderSystem } from './renderSystem';
// import { TailGrowthSystem } from './tailGrowthSystem';
// import { FollowSystem } from './followSystem';

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  world
    .addSystem(new DirectionControlSystem(world))
    .addSystem(new MovementSystem(world))
    .addSystem(new TeleportSystem(config, world))
    .addSystem(new CollisionSystem(world))
    .addSystem(new AttackSystem(world))
    .addSystem(new DamageSystem(world))
    .addSystem(new HealthSystem(world))
    .addSystem(new SpawnSystem(world))
    .addSystem(new RenderSystem(board, world));
};
