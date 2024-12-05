import { Shape } from '../geometry/shape/shape';
import { Vector2 } from '../geometry/vector2';
import { IComponent } from '../../ecs/component';
import { Square } from '../geometry/shape/square';

export class Render implements IComponent {
  constructor(
    readonly id: number,
    public shape: Shape = new Square(20),
    public color: string = 'black'
  ) {}

  public draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    this.shape.draw(ctx, position, this.color);
  }
}
