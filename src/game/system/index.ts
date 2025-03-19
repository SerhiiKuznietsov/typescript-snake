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
  const { lastVector } = config;

  // TODO - add destroy method for system because need clean groups

  system
    .add(new PlayerInputSystem(world, inputManager))
    .add(new HunterTargetSystem(world))
    .add(new MovementCooldownSystem(world))
    .add(new MovementDirectionSystem(world))
    .add(new HunterDirectionSystem(world, gridManager))
    .add(new MovementPositionCalculationSystem(world))
    .add(new MovementAreaSystem(world, lastVector.x, lastVector.y))
    .add(new MovementPrevPositionSystem(world))
    .add(new SnakeMovementSystem(world))
    .add(new MovementSystem(world, gridManager))
    .add(new SnakeBoundarySystem(world, lastVector.x, lastVector.y))
    .add(new CollisionSystem(world, gridManager))
    .add(new AttackSystem(world))
    .add(new DeathSystem(world, gridManager))
    .add(new SnakeInitSystem(world))
    .add(new FoodInitSystem(world, config.foodCount))
    // .add(new HunterInitSystem(world, gridSize, config.hunterCount))
    .add(new PoisonInitSystem(world, config.poisonCount))
    .add(new RespawnTriggerSystem(world))
    .add(new RespawnCooldownSystem(world))
    .add(new RespawnPositionSystem(world, gridManager))
    .add(new RespawnSystem(world, gridManager))
    .add(new RenderSystem(world, board));
};
