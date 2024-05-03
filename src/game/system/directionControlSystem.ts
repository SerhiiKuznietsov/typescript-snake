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
      const control = entity.getComponent(DirectionControl);
      const movement = entity.getComponent(Movement);

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
      const control = entity.getComponent(DirectionControl);

      if (!control) return;

      control.setKey(e);
    });
  }
}
