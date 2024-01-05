export class Cube {
  private _size: number;
  public get size(): number {
    return this._size;
  }

  constructor(size: number) {
    this._size = size;
  }
}