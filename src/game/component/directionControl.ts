import { Entity } from '../entity/entity';
import { Direction } from '../geometry/direction';
import { Component } from './component';

export class DirectionControl extends Component {
  direction: Direction;

  constructor(entity: Entity, vector: Direction) {
    super(entity);
    this.direction = vector;
  }
}
