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

export const guiConfig: Record<string, any> = {
  [Collider.name]: {
    width: { type: 'number', min: 0, max: 1000, step: 1 },
    height: { type: 'number', min: 0, max: 1000, step: 1 },
  },
  [Movement.name]: {
    accumulatedTime: { type: 'number', min: 0, max: 10000, step: 100 },
    moveInterval: { type: 'number', min: 0, max: 10000, step: 100 },
  },
  [Position.name]: {
    x: { type: 'number', min: 0, max: 100, step: 10 },
    y: { type: 'number', min: 0, max: 100, step: 10 },
  },
  [PrevPosition.name]: {
    x: { type: 'number', min: 0, max: 100, step: 10 },
    y: { type: 'number', min: 0, max: 100, step: 10 },
  },
  [DebugFlag.name]: {},
  [Food.name]: {},
  [PlayerInput.name]: {},
  [Poison.name]: {},
  [Render.name]: {
    color: { type: 'color' },
    zIndex: { type: 'number', min: -10, max: 10, step: 1 },
  },
  [Velocity.name]: {
    value: { type: 'number', min: 0, max: 10, step: 0.1 },
  },
};
