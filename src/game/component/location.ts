import { Entity } from '../entity/entity';
import { Vector2 } from '../geometry/vector2';
import { Component } from './component';

export class Location extends Component {
  public position: Vector2;

  constructor(entity: Entity, position: Vector2) {
    super(entity);
    this.position = position;
  }
}
