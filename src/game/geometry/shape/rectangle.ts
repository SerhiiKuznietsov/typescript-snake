import { Color } from '@/game/component/color';
import { Vector2 } from '../vector2';
import { Shape } from './shape';

export class Rectangle extends Shape {
  private _width: number;
  public get width(): number {
    return this._width;
  }

  private _height: number;
  public get _eight(): number {
    return this._height;
  }

  constructor(width: number, height: number) {
    super();
    this._width = width;
    this._height = height;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    color: Color
  ): void {
    ctx.fillStyle = color.value;
    ctx.fillRect(position.x, position.y, this._width, this._height);
  }
}
