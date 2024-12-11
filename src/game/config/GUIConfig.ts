import { Collider } from '../component/Collider';
import { DebugFlag } from '../component/DebugFlag';
import { Movement } from '../component/Movement';
import { Position } from '../component/Position';
import { Food } from '../component/Food';
import { PlayerInput } from '../component/PlayerInput';
import { Poison } from '../component/Poison';
import { Render } from '../component/Render';
import { Velocity } from '../component/Velocity';
import { PrevPosition } from '../component/PrevPosition';
import { CanMove } from '../component/CanMove';
import { Direction } from '../component/Direction';
import { MoveTo } from '../component/MoveTo';
import { Respawn } from '../component/Respawn';
import { RespawnReady } from '../component/RespawnReady';
import { Snake } from '../component/Snake';

export const guiConfig: Record<string, any> = {
  [CanMove.name]: {},
  [Collider.name]: {
    width: { type: 'number', min: 0, max: 1000, step: 1 },
    height: { type: 'number', min: 0, max: 1000, step: 1 },
  },
  [DebugFlag.name]: {},
  [Direction.name]: {
    x: { type: 'number', min: -1, max: 1, step: 1 },
    y: { type: 'number', min: -1, max: 1, step: 1 },
  },
  [Food.name]: {},
  [Movement.name]: {
    accumulatedTime: { type: 'number', min: 0, max: 1000, step: 100 },
    moveInterval: { type: 'number', min: 0, max: 1000, step: 100 },
  },
  [MoveTo.name]: {},
  [PlayerInput.name]: {},
  [Poison.name]: {},
  [Position.name]: {
    x: { type: 'number', min: 0, max: 100, step: 1 },
    y: { type: 'number', min: 0, max: 100, step: 1 },
  },
  [PrevPosition.name]: {
    x: { type: 'number', min: 0, max: 100, step: 1 },
    y: { type: 'number', min: 0, max: 100, step: 1 },
  },
  [Render.name]: {
    color: { type: 'color' },
    zIndex: { type: 'number', min: -10, max: 10, step: 1 },
  },
  [Respawn.name]: {
    cooldown: { type: 'number', min: 0, max: 10000, step: 100 },
    elapsed: { type: 'number', min: 0, max: 10000, step: 100 },
  },
  [RespawnReady.name]: {},
  [Snake.name]: {},
  [Velocity.name]: {
    value: { type: 'number', min: 0, max: 10, step: 0.1 },
  },
};
