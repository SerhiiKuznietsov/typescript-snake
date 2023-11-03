import { Mesh } from "../geometry/mesh";
import { Vector2 } from "../geometry/vector";

export abstract class GameObject {
  protected _position: Vector2;
  public get position(): Vector2 {
    return this._position;
  }

  protected _mesh: Mesh = new Mesh();
  public get mesh(): Mesh {
    return this._mesh;
  }

  constructor(position: Vector2) {
    this._position = position;
  }

  public abstract init(): void
}