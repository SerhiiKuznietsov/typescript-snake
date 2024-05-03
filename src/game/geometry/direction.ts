import { Vector2 } from './vector2';

export class Direction {
  private _vector: Vector2;

  constructor(vector: Vector2 = new Vector2(0, 0)) {
    this._vector = vector;
  }

  private normalizeNum(num: number): number {
    return Math.sign(num);
  }

  public moveX(x: number): void {
    this._vector = new Vector2(this.normalizeNum(x), 0);
  }

  public moveY(y: number): void {
    this._vector = new Vector2(0, this.normalizeNum(y));
  }

  public getCopy(): Vector2 {
    return this._vector.copy();
  }
}
