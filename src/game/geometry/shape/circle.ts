import { Color } from '@/game/utils/color';
import { Shape } from './shape';
import { Vector2 } from '../vector2';

export class Circle extends Shape {
  private _radius: number;
  public get radius(): number {
    return this._radius;
  }

  constructor(radius: number, color: Color) {
    super(color);
    this._radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    ctx.beginPath();
    ctx.arc(position.x, position.y, this._radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color.value;
    ctx.fill();
  }
}
