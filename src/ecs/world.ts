import { EntityId } from './Entity';
import { EventBus } from './EventBus';
import {
  ComponentMapType,
  EntityComponentStorage,
} from './EntityComponentStorage';
import { GroupManager } from './group/GroupManager';
import { MessageBroker } from './MessageBroker';
import { IComponentPool } from './entity/ComponentPoolManager';
import { ComponentMap } from '@/game/component/components';

/*
  TODO - need create Debugger class
*/

export class World {
  private _eventBus: EventBus;
  private _storage: EntityComponentStorage;
  private _groupManager: GroupManager;

  public messageBroker: MessageBroker;

  constructor() {
    this._eventBus = new EventBus();
    this._storage = new EntityComponentStorage(this._eventBus);
    this._groupManager = new GroupManager(this._eventBus, this._storage);

    this.messageBroker = new MessageBroker();
  }

  public createEntity(): EntityId {
    return this._storage.createEntity();
  }

  public deleteEntity(entityId: EntityId): void {
    this._storage.deleteEntity(entityId);
  }

  public registerPool<K extends keyof ComponentMap>(
    componentName: K,
    pool: IComponentPool<ComponentMap[K]>
  ): this {
    this._storage.registerComponent(componentName, pool);

    return this;
  }

  public hasComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K
  ): boolean {
    return this._storage.hasComponent(entityId, componentName);
  }

  public getComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    if (!this.hasComponent(entityId, componentName)) {
      this._storage.addComponent(entityId, componentName, params);
    }

    return this._storage.getComponent(entityId, componentName);
  }

  public getComponents(entityId: EntityId): ComponentMapType {
    return this._storage.getComponents(entityId);
  }

  public removeComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K
  ): this {
    this._storage.removeComponent(entityId, componentName);

    return this;
  }

  public newGroup<K extends keyof ComponentMap>(
    has: K[] = [],
    not: K[] = []
  ): EntityId[] {
    return this._groupManager.createGroup([has, not]);
  }

  public releaseGroup<K extends keyof ComponentMap>(
    has: K[],
    not: K[] = []
  ): void {
    this._groupManager.releaseGroup([has, not]);
  }

  public destroy() {
    this._eventBus.clear();
    this._storage.destroy();
    this._groupManager.destroy();
    this.messageBroker.clearAll();
  }
}
