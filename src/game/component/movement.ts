import { Vector2 } from '../geometry/vector2';
import { IComponent } from '../../ecs/component';

export class Movement implements IComponent {
  public accumulatedTime: number = 0;
  public moveInterval: number;

  constructor(
    readonly id: number,
    public readonly velocity: Vector2,
    moveInterval: number = 0.1
  ) {
    this.moveInterval = moveInterval * 100;
  }
}
