import { Color } from '@/game/utils/color';
import { Shape } from './shape';
import { Vector2 } from '../vector2';

export class Triangle extends Shape {
  constructor(public size: number, color: Color) {
    super(color);
  }

  draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x + this.size, position.y);
    ctx.lineTo(
      position.x + this.size / 2,
      position.y - this.size * Math.sin(Math.PI / 3)
    );
    ctx.closePath();
    ctx.fillStyle = this.color.value;
    ctx.fill();
  }
}
