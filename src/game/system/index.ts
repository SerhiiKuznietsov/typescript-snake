import { World } from '@/ecs/World';
import { GameConfig } from '../config/game';
import { Board } from '../board';
import { PlayerInputSystem } from './PlayerInputSystem';
import { CollisionSystem } from './СollisionSystem';
import { RenderSystem } from './RenderSystem';
import { AttackSystem } from './AttackSystem';
import { MovementCooldownSystem } from './MovementCooldownSystem';
import { RespawnCooldownSystem } from './RespawnCooldownSystem';
import { RespawnSystem } from './RespawnSystem';
import { MovementPositionCalculationSystem } from './MovementPositionCalculationSystem';
import { SnakeMovementSystem } from './SnakeMovementSystem';
import { SnakeBoundarySystem } from './SnakeBoundarySystem';
import { MovementAreaSystem } from './MovementAreaSystem';
import { SystemRegistry } from '@/ecs/SystemRegistry';
import { GridManager } from '../managers/GridManager';
import { SnakeInitSystem } from './SnakeInitSystem';
import { FoodInitSystem } from './FoodInitSystem';
import { PoisonInitSystem } from './PoisonInitSystem';
import { DeathSystem } from './DeathSystem';
import { HunterInitSystem } from './HunterInitSystem';
import { HunterTargetSystem } from './HunterTargetSystem';
import { HunterDirectionSystem } from './HunterDirectionSystem';
import { MovementSystem } from './MovementSystem';
import { MovementDirectionSystem } from './MovementDirectionSystem';
import { InputManager } from '../managers/InputManager';
import { RespawnPositionSystem } from './RespawnPositionSystem';
import { RespawnTriggerSystem } from './RespawnTriggerSystem';

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
    .addSystem(new SnakeMovementSystem(world, gridSize))
    .addSystem(new MovementSystem(world, gridManager))
    .addSystem(new SnakeBoundarySystem(world, x, y))
    .addSystem(new CollisionSystem(world, gridManager))
    .addSystem(new AttackSystem(world))
    .addSystem(new DeathSystem(world, gridManager))
    .addSystem(new SnakeInitSystem(world, gridSize))
    .addSystem(new FoodInitSystem(world, gridSize, config.foodCount))
    // .addSystem(new HunterInitSystem(world, gridSize, config.hunterCount))
    .addSystem(new PoisonInitSystem(world, gridSize, config.poisonCount))
    .addSystem(new RespawnTriggerSystem(world))
    .addSystem(new RespawnCooldownSystem(world))
    .addSystem(new RespawnPositionSystem(world, gridManager))
    .addSystem(new RespawnSystem(world, gridManager))
    .addSystem(new RenderSystem(world, board));
};
