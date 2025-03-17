import { IdManager } from './idManager';
import { EventMap } from './EcsEvents';
import { EventBus } from './EventBus';
import { EntityId } from './Entity';

export class EntityStorage {
  private _entityId = new IdManager();
  private _list: Set<EntityId> = new Set();

  constructor(private _eventBus: EventBus<EventMap>) {}

  public hasEntity(entity: EntityId): boolean {
    return this._list.has(entity);
  }

  public createEntity(): EntityId {
    const entity = this._entityId.generateId();

    this._list.add(entity);
    this._eventBus.emit('ENTITY_CREATED', { entity });

    return entity;
  }

  public deleteEntity(entity: EntityId): void {
    if (!this.hasEntity(entity)) {
      throw new Error(`Entity with id: "${entity}" not found`);
    }

    this._list.delete(entity);
    this._eventBus.emit('ENTITY_DELETED', { entity });
  }

  public getAllEntities(): EntityId[] {
    return Array.from(this._list);
  }

  public destroy() {
    this._entityId.clear();
    this._list.clear();
  }
}
