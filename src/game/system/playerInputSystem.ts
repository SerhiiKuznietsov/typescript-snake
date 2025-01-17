import { ISystem } from '@/ecs/SystemRegistry';
import { keyBoard } from '../keyBoard';
import { World } from '@/ecs/World';

export class PlayerInputSystem implements ISystem {
  public entities = this.w.newGroup(['PlayerInput', 'Direction']);

  constructor(public w: World) {
    this.initializeListeners();
  }

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      const control = this.w.getComponent(entity, 'Direction');

      control.changed = false;
    }
  }

  private normalizeNum(num: number): number {
    return Math.sign(num);
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
    // TODO - remove chanes and add the ability to pass an array
  }

  private setControl = ({ code }: KeyboardEvent): void => {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const direction = this.w.getComponent(entity, 'Direction');

      if (direction.changed) continue;

      direction.changed = true;

      if (['KeyW', 'ArrowUp'].includes(code) && direction.y !== 1) {
        direction.x = 0;
        direction.y = this.normalizeNum(-1);
        continue;
      }

      if (['KeyD', 'ArrowRight'].includes(code) && direction.x !== -1) {
        direction.x = this.normalizeNum(1);
        direction.y = 0;
        continue;
      }

      if (['KeyS', 'ArrowDown'].includes(code) && direction.y !== -1) {
        direction.x = 0;
        direction.y = this.normalizeNum(1);
        continue;
      }

      if (['KeyA', 'ArrowLeft'].includes(code) && direction.x !== 1) {
        direction.x = this.normalizeNum(-1);
        direction.y = 0;
        continue;
      }
    }
  };
}
