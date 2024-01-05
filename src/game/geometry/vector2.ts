export class Vector2 {
  private _x: number;
  public get x(): number {
    return this._x;
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public set(x: number, y: number): Vector2 {
    this._x = x;
    this._y = y;

    return this;
  }

  public add(vector: Vector2): Vector2 {
    this._x += vector.x;
    this._y += vector.y;

    return this;
  }

  public isEqual(vector: Vector2) {
    return vector.x === this._x && vector.y === this._y;
  }

  public copy(): Vector2 {
    return new Vector2(this._x, this._y);
  }
}
