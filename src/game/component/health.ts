import { Entity } from '../entity/entity';
import { Component } from './component';

export class Health extends Component {
  public readonly canRespawn: boolean;
  private _isAlive: boolean = true;
  public get isAlive(): boolean {
    return this._isAlive;
  }

  constructor(entity: Entity, canRespawn: boolean) {
    super(entity);
    this.canRespawn = canRespawn;
  }

  public takeDamage(): void {
    if (!this._isAlive) return;

    this._isAlive = false;
  }

  public respawn(): void {
    this._isAlive = true;
  }
}
