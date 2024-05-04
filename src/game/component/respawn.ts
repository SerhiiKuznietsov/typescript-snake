import { Entity } from '../entity/entity';
import { Component } from './component';

export class Respawn extends Component {
  public readonly respawnTime: number;
  public remainingTime: number = 0;
  public processing: boolean = false;

  constructor(entity: Entity, respawnTime: number = 1) {
    super(entity);
    this.respawnTime = respawnTime * 1000;
  }
}
