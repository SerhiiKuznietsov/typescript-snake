import { Entity } from '../entity/entity';
import { Vector2 } from '../geometry/vector2';
import { Component } from './component';
import { Location } from './location';

export class Body extends Component {
  public segments: Location[] = [];

  constructor(entity: Entity) {
    super(entity);
  }

  public grow(position: Vector2): void {
    this.segments.push(new Location(this.entity, position));
  }
}
