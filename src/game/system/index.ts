import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './PlayerInputSystem';
import { MovementSystem } from './MovementSystem';
import { CollisionSystem } from './СollisionSystem';
import { RenderSystem } from './RenderSystem';
import { AttackSnakeSystem } from './AttackSnakeSystem';
import { DebugSystem } from './DebugSystem';
import { MovementCooldownSystem } from './MovementCooldownSystem';
import { RespawnCooldownSystem } from './RespawnCooldownSystem';
import { RespawnSystem } from './RespawnSystem';
import { MovementPositionCalculationSystem } from './MovementPositionCalculationSystem';
import { SnakeMovementSystem } from './SnakeMovementSystem';
import { SnakeBoundarySystem } from './SnakeBoundarySystem';
import { MovementAreaSystem } from './MovementAreaSystem';

export const initSystems = (world: World, config: GameConfig, board: Board) => {
  const { x, y } = config.lastVector;

  world
    .addSystem(new RenderSystem(world, board))
    .addSystem(new PlayerInputSystem(world))
    .addSystem(new MovementCooldownSystem(world))
    .addSystem(new MovementPositionCalculationSystem(world))
    .addSystem(new MovementAreaSystem(world, x, y))
    .addSystem(new MovementSystem(world))
    .addSystem(new SnakeMovementSystem(world))
    .addSystem(new SnakeBoundarySystem(world, x, y))
    .addSystem(new CollisionSystem(world))
    .addSystem(new AttackSnakeSystem(world, config))
    .addSystem(new RespawnCooldownSystem(world))
    .addSystem(new RespawnSystem(world, { x, y }))
    .addSystem(new DebugSystem(world));
};
