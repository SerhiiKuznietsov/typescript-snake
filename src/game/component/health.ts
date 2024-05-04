import { Entity } from '../entity/entity';
import { Component } from './component';

export class Health extends Component {
  public readonly canRespawn: boolean;
  public isAlive: boolean = true;

  constructor(entity: Entity, canRespawn: boolean) {
    super(entity);
    this.canRespawn = canRespawn;
  }
}
