import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './playerInputSystem';
import { CollisionSystem } from './collisionSystem';
import { RenderSystem } from './renderSystem';
import { AttackSystem } from './attackSystem';
import { MovementCooldownSystem } from './movementCooldownSystem';
import { RespawnCooldownSystem } from './respawnCooldownSystem';
import { RespawnSystem } from './respawnSystem';
import { MovementPositionCalculationSystem } from './movementPositionCalculationSystem';
import { SnakeMovementSystem } from './snakeMovementSystem';
import { SnakeBoundarySystem } from './snakeBoundarySystem';
import { MovementAreaSystem } from './movementAreaSystem';
import { SystemRegistry } from '@/ecs/SystemRegistry';
import { GridManager } from '../managers/GridManager';
import { SnakeInitSystem } from './snakeInitSystem';
import { FoodInitSystem } from './foodInitSystem';
import { PoisonInitSystem } from './poisonInitSystem';
import { DeathSystem } from './deathSystem';
import { HunterInitSystem } from './hunterInitSystem';
import { HunterTargetSystem } from './hunterTargetSystem';
import { HunterDirectionSystem } from './hunterDirectionSystem';
import { MovementSystem } from './movementSystem';
import { MovementDirectionSystem } from './movementDirectionSystem';
import { InputManager } from '../managers/InputManager';
import { RespawnPositionSystem } from './respawnPositionSystem';
import { RespawnTriggerSystem } from './respawnTriggerSystem';
import { MovementPrevPositionSystem } from './movementPrevPositionSystem';

export const initSystems = (
  system: SystemRegistry,
  world: World,
  config: GameConfig,
  board: Board,
  gridManager: GridManager,
  inputManager: InputManager
) => {
  const {
    gridSize,
    lastVector: { x, y },
  } = config;

  // TODO - add destroy method for system because need clean groups

  system
    .addSystem(new PlayerInputSystem(world, inputManager))
    .addSystem(new HunterTargetSystem(world))
    .addSystem(new MovementCooldownSystem(world))
    .addSystem(new MovementDirectionSystem(world))
    .addSystem(new HunterDirectionSystem(world, gridManager))
    .addSystem(new MovementPositionCalculationSystem(world))
    .addSystem(new MovementAreaSystem(world, x, y))
    .addSystem(new MovementPrevPositionSystem(world))
    .addSystem(new SnakeMovementSystem(world))
    .addSystem(new MovementSystem(world, gridManager))
    .addSystem(new SnakeBoundarySystem(world, x, y))
    .addSystem(new CollisionSystem(world, gridManager))
    .addSystem(new AttackSystem(world))
    .addSystem(new DeathSystem(world, gridManager))
    .addSystem(new SnakeInitSystem(world))
    .addSystem(new FoodInitSystem(world, config.foodCount))
    // .addSystem(new HunterInitSystem(world, gridSize, config.hunterCount))
    .addSystem(new PoisonInitSystem(world, config.poisonCount))
    .addSystem(new RespawnTriggerSystem(world))
    .addSystem(new RespawnCooldownSystem(world))
    .addSystem(new RespawnPositionSystem(world, gridManager))
    .addSystem(new RespawnSystem(world, gridManager))
    .addSystem(new RenderSystem(world, board));
};
