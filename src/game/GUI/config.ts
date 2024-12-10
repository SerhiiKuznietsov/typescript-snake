import { Collider } from '../component/Collider';
import { DebugFlag } from '../component/DebugFlag';
import { Movement } from '../component/Movement';
import { Position } from '../component/Position';
import { Vector2 } from '../geometry/vector2';
import { Food } from '../component/Food';
import { PlayerInput } from '../component/PlayerInput';
import { Poison } from '../component/Poison';
import { Render } from '../component/Render';
import { Velocity } from '../component/Velocity';

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
    position: {
      type: 'vector2',
      config: {
        x: { type: 'number', min: 0, max: 1000, step: 1 },
        y: { type: 'number', min: 0, max: 1000, step: 1 },
      },
    },
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

export const vector2Handler = (vector: Vector2, gui: dat.GUI): void => {
  const folder = gui.addFolder('Vector2');

  folder
    .add({ x: vector.x }, 'x', 0, 100, 1)
    .onChange((value) => vector.setX(value))
    .listen();
  folder
    .add({ y: vector.y }, 'y', 0, 100, 1)
    .onChange((value) => vector.setY(value))
    .listen();
};
