import { Color } from '@/game/utils/color';
import { Vector2 } from '../vector2';

export abstract class Shape {
  constructor(protected color: Color) {}

  abstract draw(ctx: CanvasRenderingContext2D, position: Vector2): void;
}
