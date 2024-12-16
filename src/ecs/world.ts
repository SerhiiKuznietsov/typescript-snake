import { EntityId } from './Entity';
import { EventBus } from './EventBus';
import {
  ComponentMapType,
  EntityComponentStorage,
} from './EntityComponentStorage';
import { GroupManager } from './group/GroupManager';
import {
  ComponentConstructorList,
  IComponent,
  IComponentConstructor,
} from './Component';
import { MessageBroker } from './MessageBroker';

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

  public hasComponent(
    entityId: EntityId,
    componentType: IComponentConstructor<IComponent>
  ): boolean {
    return this._storage.hasComponent(entityId, componentType);
  }

  public getComponent<T extends IComponent>(
    entityId: EntityId,
    componentType: IComponentConstructor<T>,
    ...args: any[]
  ): T {
    if (!this.hasComponent(entityId, componentType)) {
      this._storage.addComponent(entityId, componentType, args);
    }

    return this._storage.getComponent(entityId, componentType);
  }

  public getComponents(entityId: EntityId): ComponentMapType {
    return this._storage.getComponents(entityId);
  }

  public removeComponent(
    entityId: EntityId,
    componentType: IComponentConstructor<IComponent>
  ): this {
    this._storage.removeComponent(entityId, componentType);

    return this;
  }

  public newGroup(
    has: ComponentConstructorList,
    not: ComponentConstructorList = []
  ): EntityId[] {
    return this._groupManager.createGroup([has, not]);
  }

  public releaseGroup(
    has: ComponentConstructorList,
    not: ComponentConstructorList = []
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
