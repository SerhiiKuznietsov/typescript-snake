export class Vector2 {
  private _x: number;
  public get x(): number {
    return this._x;
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }
}