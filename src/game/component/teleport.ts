import { Entity } from '../entity/entity';
import { Component } from './component';

export class Teleport extends Component {
  public isActive: boolean;

  constructor(entity: Entity, isActive: boolean = true) {
    super(entity);
    this.isActive = isActive;
  }
}
