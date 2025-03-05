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
import { KeyboardInput, KeyboardInputPool } from './KeyboardInput';
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
import { Player, PlayerPool } from './Player';
import { RespawnСooldown, RespawnСooldownPool } from './RespawnСooldown';

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
  KeyboardInput: KeyboardInput;
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
  Player: Player;
  RespawnСooldown: RespawnСooldown;
}

export const registerComponents = (w: World): void => {
  w.registerPool('Attacker', AttackerPool)
    .registerPool('CollisionHandler', CollisionHandlerPool)
    .registerPool('CollisionDetected', CollisionDetectedPool)
    .registerPool('CanMove', CanMovePool)
    .registerPool('Death', DeathPool)
    .registerPool('Food', FoodPool)
    .registerPool('Hunter', HunterPool)
    .registerPool('Hunts', HuntsPool)
    .registerPool('KeyboardInput', KeyboardInputPool)
    .registerPool('Direction', DirectionPool)
    .registerPool('Velocity', VelocityPool)
    .registerPool('Movement', MovementPool)
    .registerPool('Moved', MovedPool)
    .registerPool('MoveTo', MoveToPool)
    .registerPool('PrevPosition', PrevPositionPool)
    .registerPool('Poison', PoisonPool)
    .registerPool('Position', PositionPool)
    .registerPool('Render', RenderPool)
    .registerPool('Snake', SnakePool)
    .registerPool('SnakeBody', SnakeBodyPool)
    .registerPool('Target', TargetPool)
    .registerPool('Respawn', RespawnPool)
    .registerPool('RespawnReady', RespawnReadyPool)
    .registerPool('RespawnPosition', RespawnPositionPool)
    .registerPool('RespawnСooldown', RespawnСooldownPool)
    .registerPool('Reborn', RebornPool)
    .registerPool('Player', PlayerPool);
};
