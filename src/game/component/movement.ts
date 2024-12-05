import { Vector2 } from '../geometry/vector2';
import { IComponent } from '../../ecs/component';

export class Movement implements IComponent {
  public accumulatedTime: number = 0;
  public moveInterval: number;

  constructor(
    readonly id: number,
    public velocity: Vector2 = new Vector2(20, 0),
    moveInterval: number = 0.8
  ) {
    this.moveInterval = moveInterval * 100;
  }
}
