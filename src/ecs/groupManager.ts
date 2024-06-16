import { Entity } from './entity';
import { EntityComponentStorage } from './entityComponentStorage';
import { ISystem } from './system';

export class GroupManager {
  private _entityStorage: EntityComponentStorage;
  private _systemEntities: Map<ISystem, Set<Entity>> = new Map();

  constructor(entityStorage: EntityComponentStorage) {
    this._entityStorage = entityStorage;
  }

  public registerSystem(system: ISystem): void {
    this._systemEntities.set(system, new Set<Entity>());

    this._entityStorage
      .getAllEntities()
      .forEach((entity) => this._updateSystem(system, entity));
  }

  public unregisterSystem(system: ISystem): void {
    this._systemEntities.delete(system);
  }

  public entityUpdated(entity: Entity): void {
    this._systemEntities.forEach((value, system) => {
      this._updateSystem(system, entity);
    });
  }

  private _updateSystem(system: ISystem, entity: Entity): void {
    const entities = this._systemEntities.get(system)!;
    if (this._matchesSystem(system, entity)) {
      entities.add(entity);
    } else {
      entities.delete(entity);
    }
  }

  private _matchesSystem(system: ISystem, entity: Entity): boolean {
    if (system.requiredComponents) {
      for (const component of system.requiredComponents) {
        if (entity.has(component)) continue;

        return false;
      }
    }

    if (system.excludedComponents) {
      for (const component of system.excludedComponents) {
        if (!entity.has(component)) continue;

        return false;
      }
    }

    return true;
  }

  public getEntitiesForSystem(system: ISystem): Set<Entity> {
    return this._systemEntities.get(system)!;
  }
}
