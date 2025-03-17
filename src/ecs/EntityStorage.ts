import { IdManager } from './idManager';
import { EntityId } from './Entity';

export class EntityStorage {
  private _entityId = new IdManager();
  private _list: Set<EntityId> = new Set();

  public hasEntity(entity: EntityId): boolean {
    return this._list.has(entity);
  }

  public createEntity(): EntityId {
    const entity = this._entityId.generateId();

    this._list.add(entity);

    return entity;
  }

  public deleteEntity(entity: EntityId): void {
    if (!this.hasEntity(entity)) {
      throw new Error(`Entity with id: "${entity}" not found`);
    }

    this._list.delete(entity);
  }

  public getAllEntities(): EntityId[] {
    return Array.from(this._list);
  }

  public destroy() {
    this._entityId.clear();
    this._list.clear();
  }
}
