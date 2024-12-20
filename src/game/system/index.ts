import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './PlayerInputSystem';
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
import { FoodInitSystem } from './FoodInitSystem';
import { PoisonInitSystem } from './PoisonInitSystem';
import { DeathSystem } from './DeathSystem';
import { HunterInitSystem } from './HunterInitSystem';
import { HunterTargetSystem } from './HunterTargetSystem';
import { HunterDirectionSystem } from './HunterDirectionSystem';
import { HunterMovementSystem } from './HunterMovementSystem';
import { HunterAttackSystem } from './HunterAttackSystem';

export const initSystems = (
  system: SystemRegistry,
  world: World,
  config: GameConfig,
  board: Board,
  gridManager: GridManager
) => {
  const {
    gridSize,
    lastVector: { x, y },
  } = config;

  // TODO - add destroy method for system because need clean groups

  system

    // TODO - createHunter();
    // const hunter = new Entity('hunter');
    .addSystem(new PlayerInputSystem(world))
    .addSystem(new HunterTargetSystem(world))
    .addSystem(new HunterDirectionSystem(world))
    .addSystem(new MovementCooldownSystem(world))
    .addSystem(new MovementPositionCalculationSystem(world))
    .addSystem(new MovementAreaSystem(world, x, y))
    .addSystem(new SnakeMovementSystem(world, gridManager, gridSize))
    .addSystem(new HunterMovementSystem(world, gridManager))
    .addSystem(new SnakeBoundarySystem(world, x, y))
    .addSystem(new CollisionSystem(world, gridManager))
    .addSystem(new AttackSnakeSystem(world))
    .addSystem(new HunterAttackSystem(world))
    .addSystem(new DeathSystem(world, gridManager))
    .addSystem(new SnakeInitSystem(world, gridSize))
    .addSystem(
      new FoodInitSystem(
        world,
        gridSize,
        config.xGridsCount,
        config.yGridsCount
      )
    )
    .addSystem(new HunterInitSystem(world, gridSize))
    .addSystem(new PoisonInitSystem(world, gridSize))
    .addSystem(new RespawnCooldownSystem(world))
    .addSystem(new RespawnSystem(world, gridManager, { x, y }))
    .addSystem(new RenderSystem(world, board))
    .addSystem(new DebugSystem(world));
};
