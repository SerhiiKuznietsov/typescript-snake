import { World } from '@/ecs/world';
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
import { TailGrowthSystem } from './tailGrowthSystem';
import { FollowSystem } from './followSystem';

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  world
    .registerSystem(new DirectionControlSystem(), 1)
    .registerSystem(new TailGrowthSystem(config), 2)
    .registerSystem(new FollowSystem(), 2)
    .registerSystem(new MovementSystem(), 3)
    .registerSystem(new TeleportSystem(config), 4)
    .registerSystem(new CollisionSystem(), 5)
    .registerSystem(new AttackSystem(), 6)
    .registerSystem(new DamageSystem(), 7)
    .registerSystem(new HealthSystem(), 8)
    .registerSystem(new SpawnSystem(), 9)
    .registerSystem(new RenderSystem(board), 10, true);
};
