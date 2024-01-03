export class Direction {
  private _x: number;
  private _y: number;
  private _step: number;
  private _directionX: number;
  private _directionY: number;
  private _data: { [key: number]: any } = {};

  constructor(x = 1, y = 0, step = 1) {
    this._x = x;
    this._y = y;
    this._step = step;
    this._directionX = x;
    this._directionY = y;
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

  public calcDirection({ x, y }: { x: number, y: number }): [number, number] {
    return [x + this._directionX, y + this._directionY];
  }

  private setDirectionX(x: number): void {
    if (Math.sign(x) + Math.sign(this._directionX) === 0) return;

    this._directionX = x;
    this._directionY = 0;
  }
  private setDirectionY(y: number): void {
    if (Math.sign(y) + Math.sign(this._directionY) === 0) return;

    this._directionX = 0;
    this._directionY = y;
  }
}
