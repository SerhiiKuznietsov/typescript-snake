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
import { SystemRegistry } from '@/ecs/SystemRegistry';
import { GridManager } from '../GridManager';
import { SnakeInitSystem } from './SnakeInitSystem';

export const initSystems = (
  system: SystemRegistry,
  world: World,
  config: GameConfig,
  board: Board,
  gridManager: GridManager
) => {
  const { x, y } = config.lastVector;

  // TODO - add destroy method for system because need clean groups

  system
    .addSystem(new SnakeInitSystem(world,  system, config.gridSize))
    .addSystem(new PlayerInputSystem(world))
    .addSystem(new MovementCooldownSystem(world))
    .addSystem(new MovementPositionCalculationSystem(world))
    .addSystem(new MovementAreaSystem(world, x, y))
    .addSystem(new MovementSystem(world, gridManager))
    .addSystem(new SnakeMovementSystem(world))
    .addSystem(new SnakeBoundarySystem(world, x, y))
    .addSystem(new CollisionSystem(world, gridManager))
    .addSystem(new AttackSnakeSystem(world, gridManager, config))
    .addSystem(new RespawnCooldownSystem(world))
    .addSystem(new RespawnSystem(world, gridManager, { x, y }))
    .addSystem(new RenderSystem(world, board))
    .addSystem(new DebugSystem(world));
};
