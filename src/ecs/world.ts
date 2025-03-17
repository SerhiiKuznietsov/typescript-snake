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
  private _entities: EntityStorage = new EntityStorage();
  private _components: ComponentStorage = new ComponentStorage();
  private _entityBitMaps: BitMapManager = new BitMapManager();
  private _groupManager: GroupManager = new GroupManager(
    this._entities,
    this._entityBitMaps
  );

  public messageBroker: MessageBroker = new MessageBroker();
  public bus: EventBus<EventMap> = new EventBus();
  public task: TaskManager = new TaskManager(this.bus);

  public init() {
    this.task.init();
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
      this._entityBitMaps.onEntityDeleted(entity);
      this._components.onEntityDeleted(entity);
      this._groupManager.onEntityDeleted(entity);
    });
  }

  public registerPool<K extends keyof ComponentMap>(
    componentName: K,
    pool: IComponentPool<ComponentMap[K]>
  ): this {
    this._components.registerComponent(componentName, pool);
    this._entityBitMaps.onRegisterComponent(componentName);

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
    if (this.hasComponent(entity, componentName)) {
      return this._components.getComponent(entity, componentName, params);
    }

    return this.createComponent(entity, componentName, params);
  }

  private createComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    const component = this._components.addComponent(
      entity,
      componentName,
      params
    );

    this._entityBitMaps.onEntityComponentCreated(entity, componentName);
    this._groupManager.onComponentChanged(entity);

    return component;
  }

  public getComponents(entity: EntityId): ComponentMapType {
    return this._components.getComponents(entity);
  }

  public removeComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    task?: TaskCondition
  ): this {
    const callback = () => {
      this._components.removeComponent(entity, componentName);
      this._entityBitMaps.onEntityComponentDeleted(entity, componentName);
      this._groupManager.onComponentChanged(entity);
    };

    if (task) {
      this.task.addTask(task, {
        callback,
      });
    } else {
      callback();
    }

    return this;
  }

  public removeIfExistComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    task?: TaskCondition
  ): this {
    if (this._components.hasComponent(entity, componentName)) {
      this.removeComponent(entity, componentName, task);
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
    this._entities.destroy();
    this._components.destroy();
    this._groupManager.destroy();
    this._entityBitMaps.clear();
    this.messageBroker.clearAll();
    this.task.clear();
  }
}
