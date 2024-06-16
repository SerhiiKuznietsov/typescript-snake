import { Color } from '@/game/component/color';
import { Vector2 } from '../vector2';

export abstract class Shape {
  abstract draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    color: Color
  ): void;
}
