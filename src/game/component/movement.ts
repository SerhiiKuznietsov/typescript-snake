import { Entity } from '../entity/entity';
import { Vector2 } from '../geometry/vector2';
import { Component } from './component';

export class Movement extends Component {
  public velocity: Vector2;

  constructor(entity: Entity, velocity: Vector2) {
    super(entity);
    this.velocity = velocity;
  }
}
