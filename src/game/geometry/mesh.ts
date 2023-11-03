import { Cube } from './cube';
import { Vector2 } from './vector';

export class Mesh {
  private _geometry: Cube;
  public get geometry(): Cube {
    return this._geometry;
  }

  private _position: Vector2;
  public get position(): Vector2 {
    return this._position;
  }

  constructor(geometry: Cube = new Cube(), position: Vector2 = new Vector2()) {
    this._position = position;
    this._geometry = geometry;
  }
}
