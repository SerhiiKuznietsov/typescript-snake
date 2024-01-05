import { Cube } from "./geometry/cube";
import { Vector2 } from "./geometry/vector2";

export class Tail {
  private _position: Vector2;

  public get position(): Vector2 {
    return this._position;
  }

  private _cube: Cube;
  public get cube(): Cube {
    return this._cube;
  }

  private _color: string;

  constructor(vector2: Vector2, cube: Cube, color: string) {
    this._position = vector2;
    this._cube = cube;
    this._color = color;
  }

  public isCollision(tail: Tail) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this._color;

    ctx.fillRect(
      this._position.x * this._cube.size,
      this._position.y * this._cube.size,
      this._cube.size,
      this._cube.size
    );
    ctx.strokeRect(
      this._position.x * this._cube.size,
      this._position.y * this._cube.size,
      this._cube.size,
      this._cube.size
    );
  }
}