import { DirectionControl } from '../component/directionControl';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { keyBoard } from '../keyBoard';
import { World } from '@/ecs/World';

export class DirectionControlSystem implements ISystem {
  public entities: EntityId[] = [];

  constructor(public w: World) {
    this.initializeListeners();
  }

  public init() {
    this.entities = this.w.newGroup(this, [DirectionControl]);
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const control = this.w.getComponent(entity, DirectionControl);

      control.changed = false;
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
    // TODO - remove chanes and add the ability to pass an array
  }

  private setControl = ({ code }: KeyboardEvent): void => {
    this.entities.forEach((entity) => {
      const control = this.w.getComponent(entity, DirectionControl);

      if (control.changed) return;

      control.changed = true;

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
