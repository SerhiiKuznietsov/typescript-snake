import { Shape } from '../geometry/shape/shape';
import { Vector2 } from '../geometry/vector2';

export class Render {
  private _shape: Shape;

  constructor(shape: Shape) {
    this._shape = shape;
  }

  public draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    this._shape.draw(ctx, position);
  }
}
