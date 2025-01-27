import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { Shape } from '../geometry/shape/shape';
import { Vector2 } from '../geometry/vector2';
import { Square } from '../geometry/shape/square';

export class Render implements IComponent {
  constructor(
    public shape: Shape = new Square(20),
    public color: string = '#000',
  ) {}

  public draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    this.shape.draw(ctx, position, this.color);
  }
}

export const RenderPool = new ObjectPool(() => new Render(), {
  initialize(item, params) {
    if (params?.color) {
      item.color = params.color;
    }

    if (params?.shape) {
      item.shape = params.shape;
    }

  },
  deactivate(item) {
    item.color = '#000';
  },
});
