import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { InputManager } from '../managers/InputManager';

interface IInput {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

const setUp = (input: IInput) => (input.up = true);
const setDown = (input: IInput) => (input.down = true);
const setLeft = (input: IInput) => (input.left = true);
const setRight = (input: IInput) => (input.right = true);

const storage: Record<KeyboardEvent['code'], Function> = {
  KeyW: setUp,
  ArrowUp: setUp,
  KeyD: setRight,
  ArrowRight: setRight,
  KeyS: setDown,
  ArrowDown: setDown,
  KeyA: setLeft,
  ArrowLeft: setLeft,
};

export class PlayerInputSystem implements ISystem {
  public entities = this.w.newGroup(['KeyboardInput']);
  private _code: KeyboardEvent['code'] | null = null;

  constructor(public w: World, private _inputManager: InputManager) {
    this._inputManager
      .addHandler('KeyW', this.setControl)
      .addHandler('ArrowUp', this.setControl)
      .addHandler('KeyD', this.setControl)
      .addHandler('ArrowRight', this.setControl)
      .addHandler('KeyS', this.setControl)
      .addHandler('ArrowDown', this.setControl)
      .addHandler('KeyA', this.setControl)
      .addHandler('ArrowLeft', this.setControl);
    // TODO - remove chanes and add the ability to pass an array
  }

  private setControl = ({ code }: KeyboardEvent): void => {
    this._code = code;
  };

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const input = this.w.getComponent(entity, 'KeyboardInput');
      input.up = input.down = input.left = input.right = false;

      if (!this._code) continue;

      const handler = storage[this._code];

      if (!handler) continue;

      handler(input);
    }
  }

  public destroy(): void {
    this._inputManager
      .removeHandler('KeyW', this.setControl)
      .removeHandler('ArrowUp', this.setControl)
      .removeHandler('KeyD', this.setControl)
      .removeHandler('ArrowRight', this.setControl)
      .removeHandler('KeyS', this.setControl)
      .removeHandler('ArrowDown', this.setControl)
      .removeHandler('KeyA', this.setControl)
      .removeHandler('ArrowLeft', this.setControl);
  }
}
