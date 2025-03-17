import { EntityId } from './Entity';
import { EventBus } from './EventBus';
import { GroupManager } from './group/GroupManager';
import { MessageBroker } from './MessageBroker';
import { IComponentPool } from './entity/ComponentPoolManager';
import { ComponentMap } from '@/game/component/components';
import { TaskCondition, TaskManager } from './TaskManager';
import { EventMap } from './EcsEvents';
import { BitMapManager } from './entity/BitMapManager';
import { EntityStorage } from './EntityStorage';
import { ComponentStorage, ComponentMapType } from './ComponentStorage';

/*
  TODO - need create Debugger class
*/

export class World {
  private _entityBitMaps: BitMapManager;
  private _groupManager: GroupManager;
  private _entities: EntityStorage;
  private _components: ComponentStorage;
  public messageBroker: MessageBroker;
  public bus: EventBus<EventMap>;
  public task: TaskManager;

  constructor() {
    this.bus = new EventBus();
    this.messageBroker = new MessageBroker();
    this.task = new TaskManager(this.bus);

    this._entities = new EntityStorage();
    this._components = new ComponentStorage(this.bus);
    this._entityBitMaps = new BitMapManager(this.bus);
    this._groupManager = new GroupManager(
      this.bus,
      this._entities,
      this._entityBitMaps
    );
  }

  public init() {
    this.task = new TaskManager(this.bus);
    this._entityBitMaps = new BitMapManager(this.bus);
    this._groupManager = new GroupManager(
      this.bus,
      this._entities,
      this._entityBitMaps
    );
  }

  public hasEntity(entity: EntityId): boolean {
    return this._entities.hasEntity(entity);
  }

  public createEntity(): EntityId {
    const entity = this._entities.createEntity();

    this._components.onEntityCreated(entity);
    this._entityBitMaps.onEntityCreated(entity);
    this._groupManager.onEntityCreated(entity);

    return entity;
  }

  public deleteEntity(entity: EntityId): void {
    this.task.addOnCycleUpdate(() => {
      this._entities.deleteEntity(entity);
      this._entityBitMaps.onEntityDeleted(entity)
      this._components.onEntityDeleted(entity);
      this._groupManager.onEntityDeleted(entity);
    });
  }

  public registerPool<K extends keyof ComponentMap>(
    componentName: K,
    pool: IComponentPool<ComponentMap[K]>
  ): this {
    this._components.registerComponent(componentName, pool);

    return this;
  }

  public hasComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): boolean {
    return this._components.hasComponent(entity, componentName);
  }

  public getComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    if (!this.hasComponent(entity, componentName)) {
      return this._components.addComponent(entity, componentName, params);
      // this._storage.addComponent(entity, componentName, params);
    }

    return this._components.getComponent(entity, componentName, params);

    // return this._storage.getComponent(entity, componentName, params);
  }

  public getComponents(entity: EntityId): ComponentMapType {
    return this._components.getComponents(entity);

    // return this._storage.getComponents(entity);
  }

  public removeComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    task?: TaskCondition
  ): this {
    if (task) {
      this.task.addTask(task, {
        callback: () => {
          this._components.removeComponent(entity, componentName);
          // this._storage.removeComponent(entity, componentName);
        },
      });
    } else {
      this._components.removeComponent(entity, componentName);
      // this._storage.removeComponent(entity, componentName);
    }

    return this;
  }

  public removeIfExistComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): this {
    if (this._components.hasComponent(entity, componentName)) {
      this.removeComponent(entity, componentName);
    }

    // if (this._storage.hasComponent(entity, componentName)) {
    //   this._storage.removeComponent(entity, componentName);
    // }

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
    this._entities.destroy();
    this._components.destroy();
    // this._storage.destroy();
    this._groupManager.destroy();
    this._entityBitMaps.clear();
    this.messageBroker.clearAll();
    this.task.clear();
  }
}
