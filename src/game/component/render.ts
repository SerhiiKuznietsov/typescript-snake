import { Entity } from '../entity/entity';
import { Shape } from '../geometry/shape/shape';
import { Vector2 } from '../geometry/vector2';
import { Component } from './component';

export class Render extends Component {
  private _shape: Shape;

  constructor(entity: Entity, shape: Shape) {
    super(entity);
    this._shape = shape;
  }

  public draw(ctx: CanvasRenderingContext2D, position: Vector2): void {
    this._shape.draw(ctx, position);
  }
}
