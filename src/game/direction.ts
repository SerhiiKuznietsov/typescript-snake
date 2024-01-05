import { Vector2 } from "./geometry/vector2";

export class Direction {
  private _step: number;
  private _direction: Vector2;
  private _data: { [key: number]: any } = {};

  constructor(vector: Vector2 = new Vector2(1, 0), step = 1) {
    this._direction = vector;
    this._step = step;
  }

  private setHandler(arr: number[], sign: string, axis: string): void {
    for (let i = 0; i < arr.length; i++) {
      const code = arr[i];
      this._data[code] = {
        axis,
        sign,
      };
    }
  }

  public setHandlerX(arr: number[], sign: string): void {
    this.setHandler(arr, sign, "x");
  }

  public setHandlerY(arr: number[], sign: string): void {
    this.setHandler(arr, sign, "y");
  }

  public handle(code: number): void {
    if (!(code in this._data)) return;

    const { axis, sign } = this._data[code];

    if (axis === "y") {
      if (sign === "+") return this.setDirectionY(this._step);
      if (sign === "-") return this.setDirectionY(-this._step);
    }

    if (axis === "x") {
      if (sign === "+") return this.setDirectionX(this._step);
      if (sign === "-") return this.setDirectionX(-this._step);
    }
  }

  public calcDirection(vector: Vector2): [number, number] {
    return [vector.x + this._direction.x, vector.y + this._direction.y];
  }

  private setDirectionX(x: number): void {
    if (Math.sign(x) + Math.sign(this._direction.x) === 0) return;

    this._direction.set(x, 0);
  }
  private setDirectionY(y: number): void {
    if (Math.sign(y) + Math.sign(this._direction.y) === 0) return;

    this._direction.set(0, y);
  }
}
