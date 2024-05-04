import { Entity } from '../entity/entity';

export abstract class System {
  protected _entities: Entity[] = [];

  public addEntity(entity: Entity): void {
    this._entities.push(entity);
  }

  public removeEntity(entity: Entity): void {
    const index = this._entities.indexOf(entity);

    if (index < 0) return;

    this._entities.splice(index, 1);
  }

  abstract update(deltaTime?: number): void;
}
