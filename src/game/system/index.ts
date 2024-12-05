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

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  world
    .registerSystem(new DirectionControlSystem(), 1)
    .registerSystem(new MovementSystem(), 2)
    .registerSystem(new TeleportSystem(config), 3)
    .registerSystem(new CollisionSystem(), 4)
    .registerSystem(new AttackSystem(), 5)
    .registerSystem(new DamageSystem(), 6)
    .registerSystem(new HealthSystem(), 7)
    .registerSystem(new SpawnSystem(), 8)
    .registerSystem(new RenderSystem(board), 9, true);
};
