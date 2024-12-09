import { EntityId } from './entity';
import { SystemRegistry, ISystem } from './SystemRegistry';
import { EventBus } from './EventBus';
import { EntityComponentStorage } from './EntityComponentStorage';
import { GroupManager } from './group/GroupManager';
import {
  ComponentConstructorList,
  IComponent,
  IComponentConstructor,
} from './component';

export class World {
  private _eventBus: EventBus;
  private _storage: EntityComponentStorage;
  private _systemRegistry: SystemRegistry;
  private _groupManager: GroupManager;

  constructor() {
    this._eventBus = new EventBus();
    this._storage = new EntityComponentStorage(this._eventBus);
    this._systemRegistry = new SystemRegistry(this._eventBus, this);
    this._groupManager = new GroupManager(this._eventBus, this._storage);
  }

  public createEntity(): EntityId {
    return this._storage.createEntity();
  }

  public deleteEntity(entityId: EntityId): void {
    this._storage.deleteEntity(entityId);
  }

  public addComponent<T extends IComponent>(
    entityId: EntityId,
    component: IComponentConstructor<T>,
    ...args: any[]
  ): T {
    return this._storage.addComponent(entityId, component, args);
  }

  public removeComponent(
    entityId: EntityId,
    componentType: IComponentConstructor<IComponent>
  ): this {
    this._storage.removeComponent(entityId, componentType);

    return this;
  }

  public getComponent<T extends IComponent>(
    entityId: EntityId,
    componentType: IComponentConstructor<T>
  ): T {
    return this._storage.getComponent(entityId, componentType);
  }

  public hasComponent(
    entityId: EntityId,
    componentType: IComponentConstructor<IComponent>
  ): boolean {
    return this._storage.hasComponent(entityId, componentType);
  }

  public newGroup(
    system: ISystem,
    has: ComponentConstructorList,
    not: ComponentConstructorList = []
  ): EntityId[] {
    return this._groupManager.createGroup(system, has, not);
  }

  public addSystem(system: ISystem): this {
    this._systemRegistry.addSystem(system);

    return this;
  }

  public removeSystem(system: ISystem): this {
    this._systemRegistry.removeSystem(system);

    return this;
  }

  public update(deltaTime: number): this {
    this._systemRegistry.updateSystems(deltaTime);

    return this;
  }
}
