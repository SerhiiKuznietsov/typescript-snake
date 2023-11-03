import { View } from "./view";

export class Cube {
  private _width: number;
  public get width(): number {
    return this._width;
  }

  private _height: number;
  public get height(): number {
    return this._height;
  }

  private _view: View;
  public get view(): View {
    return this._view;
  }

  constructor(width: number = 1, height: number = 1, view: View = new View()) {
    this._width = width;
    this._height = height;
    this._view = view;
  }

}


