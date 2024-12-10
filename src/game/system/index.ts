import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './playerInputSystem';
import { MovementSystem } from './movementSystem';
import { CollisionSystem } from './collisionSystem';
import { RenderSystem } from './renderSystem';
import { AttackFoodSystem } from './attackFoodSystem';
import { DebugSystem } from './debugSystem';
import { MovementCooldownSystem } from './movementCooldownSystem';
import { RespawnCooldownSystem } from './respawnCooldownSystem';
import { RespawnSystem } from './respawnSystem';

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  world
    .addSystem(new RenderSystem(world, board))
    .addSystem(new PlayerInputSystem(world))
    .addSystem(new MovementCooldownSystem(world))
    .addSystem(new MovementSystem(world))
    .addSystem(new CollisionSystem(world))
    .addSystem(new AttackFoodSystem(world, config))
    .addSystem(new RespawnCooldownSystem(world))
    .addSystem(
      new RespawnSystem(world, { x: config.xGridsCount, y: config.yGridsCount })
    )
    .addSystem(new DebugSystem(world));
};
