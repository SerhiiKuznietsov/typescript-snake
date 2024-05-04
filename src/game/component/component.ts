import { Entity } from '../entity/entity';

export abstract class Component {
  public entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }
}
