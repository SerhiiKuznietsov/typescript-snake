import { DirectionControl } from '../component/directionControl';
import { Movement } from '../component/movement';
import { keyBoard } from '../keyBoard';
import { System } from './system';

export class DirectionControlSystem extends System {
  constructor() {
    super();
    this.initializeListeners();
  }

  public update(): void {
    this._entities.forEach((entity) => {
      const control = entity.get(DirectionControl);
      const movement = entity.get(Movement);

      if (!control || !movement) return;

      movement.velocity.setVector(control.direction.getCopy());
    });
  }

  private initializeListeners(): void {
    keyBoard
      .addHandler('KeyW', this.setControl)
      .addHandler('ArrowUp', this.setControl)
      .addHandler('KeyD', this.setControl)
      .addHandler('ArrowRight', this.setControl)
      .addHandler('KeyS', this.setControl)
      .addHandler('ArrowDown', this.setControl)
      .addHandler('KeyA', this.setControl)
      .addHandler('ArrowLeft', this.setControl);
  }

  private setControl = (e: KeyboardEvent): void => {
    this._entities.forEach((entity) => {
      const control = entity.get(DirectionControl);

      if (!control) return;

      const code = e.code;

      if (['KeyW', 'ArrowUp'].includes(code) && control.direction.y !== 1) {
        control.direction.moveY(-1);
        return;
      }

      if (['KeyD', 'ArrowRight'].includes(code) && control.direction.x !== -1) {
        control.direction.moveX(1);
        return;
      }

      if (['KeyS', 'ArrowDown'].includes(code) && control.direction.y !== -1) {
        control.direction.moveY(1);
        return;
      }

      if (['KeyA', 'ArrowLeft'].includes(code) && control.direction.x !== 1) {
        control.direction.moveX(-1);
        return;
      }
    });
  };
}
