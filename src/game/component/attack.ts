import { Entity } from '../entity/entity';
import { Component } from './component';

export class Attack extends Component {
  constructor(entity: Entity) {
    super(entity);
  }
}
