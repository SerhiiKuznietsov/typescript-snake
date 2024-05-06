import { Vector2 } from '../geometry/vector2';

export class Movement {
  public accumulatedTime: number = 0
  public moveInterval: number;

  constructor(public readonly velocity: Vector2, moveInterval: number = 0.1) {
    this.moveInterval = moveInterval * 100;
  }
}
