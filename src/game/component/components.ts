import { World } from '@/ecs/World';
import { CollisionDetected, CollisionDetectedPool } from './CollisionDetected';
import { CanMove, CanMovePool } from './CanMove';
import { Death, DeathPool } from './Death';
import { Direction, DirectionPool } from './Direction';
import { Food, FoodPool } from './Food';
import { Hunter, HunterPool } from './Hunter';
import { Moved, MovedPool } from './Moved';
import { Movement, MovementPool } from './Movement';
import { MoveTo, MoveToPool } from './MoveTo';
import { PlayerInput, PlayerInputPool as PlayerInputPool } from './PlayerInput';
import { Position, PositionPool } from './Position';
import { Render, RenderPool } from './Render';
import { Respawn, RespawnPool } from './Respawn';
import { RespawnReady, RespawnReadyPool } from './RespawnReady';
import { Snake, SnakePool } from './Snake';
import { SnakeBody, SnakeBodyPool } from './SnakeBody';
import { Target, TargetPool } from './Target';
import { Velocity, VelocityPool } from './Velocity';
import { Poison, PoisonPool } from './Poison';
import { CollisionHandler, CollisionHandlerPool } from './CollisionHandler';
import { Attacker, AttackerPool } from './Attacker';
import { Hunts, HuntsPool } from './Hunts';
import { Reborn, RebornPool } from './Reborn';
import { PrevPosition, PrevPositionPool } from './PrevPosition';
import { RespawnPosition, RespawnPositionPool } from './RespawnPosition';

// TODO - We need to remove the hardwiring of this interface. It is possible to pass it when creating a world

export interface ComponentMap {
  CollisionHandler: CollisionHandler;
  CollisionDetected: CollisionDetected;
  CanMove: CanMove;
  Death: Death;
  Direction: Direction;
  Food: Food;
  Hunter: Hunter;
  Hunts: Hunts;
  Moved: Moved;
  Movement: Movement;
  MoveTo: MoveTo;
  PlayerInput: PlayerInput;
  Position: Position;
  Render: Render;
  Respawn: Respawn;
  RespawnReady: RespawnReady;
  Snake: Snake;
  SnakeBody: SnakeBody;
  Target: Target;
  Velocity: Velocity;
  Poison: Poison;
  Attacker: Attacker;
  Reborn: Reborn;
  PrevPosition: PrevPosition;
  RespawnPosition: RespawnPosition;
}

export const registerComponents = (w: World) => {
  w.registerPool('Attacker', AttackerPool)
    .registerPool('CollisionHandler', CollisionHandlerPool)
    .registerPool('CollisionDetected', CollisionDetectedPool)
    .registerPool('CanMove', CanMovePool)
    .registerPool('Death', DeathPool)
    .registerPool('Direction', DirectionPool)
    .registerPool('Food', FoodPool)
    .registerPool('Hunter', HunterPool)
    .registerPool('Hunts', HuntsPool)
    .registerPool('Moved', MovedPool)
    .registerPool('Movement', MovementPool)
    .registerPool('MoveTo', MoveToPool)
    .registerPool('PlayerInput', PlayerInputPool)
    .registerPool('Poison', PoisonPool)
    .registerPool('Position', PositionPool)
    .registerPool('Render', RenderPool)
    .registerPool('Respawn', RespawnPool)
    .registerPool('RespawnReady', RespawnReadyPool)
    .registerPool('Snake', SnakePool)
    .registerPool('SnakeBody', SnakeBodyPool)
    .registerPool('Target', TargetPool)
    .registerPool('Velocity', VelocityPool)
    .registerPool('Reborn', RebornPool)
    .registerPool('PrevPosition', PrevPositionPool)
    .registerPool('RespawnPosition', RespawnPositionPool);
};
