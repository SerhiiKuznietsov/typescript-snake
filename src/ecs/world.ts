import { EntityId } from './Entity';
import { EventBus } from './EventBus';
import {
  ComponentMapType,
  EntityComponentStorage,
} from './entityComponentStorage';
import { GroupManager } from './group/GroupManager';
import { MessageBroker } from './MessageBroker';
import { IComponentPool } from './entity/ComponentPoolManager';
import { ComponentMap } from '@/game/component/components';
import { TaskCondition, TaskManager } from './TaskManager';
import { EventMap } from './EcsEvents';
import { BitMapManager } from './entity/BitMapManager';

/*
  TODO - need create Debugger class
*/

export class World {
  private _entityBitMaps: BitMapManager;
  private _storage: EntityComponentStorage;
  private _groupManager: GroupManager;
  public messageBroker: MessageBroker;
  public bus: EventBus<EventMap>;
  public task: TaskManager;

  constructor() {
    this.bus = new EventBus();
    this.messageBroker = new MessageBroker();
    this.task = new TaskManager(this.bus);

    this._storage = new EntityComponentStorage(this.bus);
    this._entityBitMaps = new BitMapManager(this.bus);
    this._groupManager = new GroupManager(
      this.bus,
      this._storage,
      this._entityBitMaps
    );
  }

  public init() {
    this.task = new TaskManager(this.bus);
    this._entityBitMaps = new BitMapManager(this.bus);
    this._groupManager = new GroupManager(
      this.bus,
      this._storage,
      this._entityBitMaps
    );
  }

  public hasEntity(entity: EntityId): boolean {
    return this._storage.hasEntity(entity);
  }

  public createEntity(): EntityId {
    return this._storage.createEntity();
  }

  public deleteEntity(entity: EntityId): void {
    this.task.addOnCycleUpdate(() => this._storage.deleteEntity(entity));
  }

  public registerPool<K extends keyof ComponentMap>(
    componentName: K,
    pool: IComponentPool<ComponentMap[K]>
  ): this {
    this._storage.registerComponent(componentName, pool);

    return this;
  }

  public hasComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): boolean {
    return this._storage.hasComponent(entity, componentName);
  }

  public getComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    if (!this.hasComponent(entity, componentName)) {
      this._storage.addComponent(entity, componentName, params);
    }

    return this._storage.getComponent(entity, componentName, params);
  }

  public getComponents(entity: EntityId): ComponentMapType {
    return this._storage.getComponents(entity);
  }

  public removeComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    task?: TaskCondition
  ): this {
    if (task) {
      this.task.addTask(task, {
        callback: () => {
          this._storage.removeComponent(entity, componentName);
        },
      });
    } else {
      this._storage.removeComponent(entity, componentName);
    }

    return this;
  }

  public removeIfExistComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): this {
    if (this._storage.hasComponent(entity, componentName)) {
      this._storage.removeComponent(entity, componentName);
    }

    return this;
  }

  public newGroup<K extends keyof ComponentMap>(
    has: K[] = [],
    not: K[] = []
  ): EntityId[] {
    return this._groupManager.getGroup([has, not]);
  }

  public releaseGroup<K extends keyof ComponentMap>(
    has: K[],
    not: K[] = []
  ): void {
    this._groupManager.releaseGroup([has, not]);
  }

  public destroy(): void {
    this.bus.clear();
    this._storage.destroy();
    this._groupManager.destroy();
    this._entityBitMaps.clear();
    this.messageBroker.clearAll();
    this.task.clear();
  }
}
