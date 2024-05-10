import { Shape } from '../geometry/shape/shape';
import { Vector2 } from '../geometry/vector2';
import { Color } from '../utils/color';

export class Render {
  private _shape: Shape;

  constructor(shape: Shape) {
    this._shape = shape;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    color: Color
  ): void {
    this._shape.draw(ctx, position, color);
  }
}
