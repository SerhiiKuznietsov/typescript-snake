import { Vector2 } from '../vector2';
import { Shape } from './shape';

export class Square extends Shape {
  private _size: number;
  public get size(): number {
    return this._size;
  }

  constructor(size: number) {
    super();
    this._size = size;
  }

  draw(ctx: CanvasRenderingContext2D, position: Vector2, color: string): void {
    ctx.fillStyle = color;
    ctx.fillRect(
      position.x * this._size,
      position.y * this._size,
      this._size,
      this._size
    );
  }
}
