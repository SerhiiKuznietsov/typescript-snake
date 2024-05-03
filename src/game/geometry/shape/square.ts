import { Color } from '@/game/utils/color';
import { Vector2 } from '../vector2';
import { Shape } from './shape';

export class Square extends Shape {
  private _size: number;
  public get size(): number {
    return this._size;
  }

  constructor(size: number, color: Color) {
    super(color);
    this._size = size;
  }

  draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    ctx.fillStyle = this.color.value;
    ctx.fillRect(position.x, position.y, this._size, this._size);
  }
}
