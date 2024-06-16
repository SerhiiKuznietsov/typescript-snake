import { IComponent, IComponentConstructor } from './component';
import { ComponentPoolManager } from './componentPoolManager';
import { Entity } from './entity';
import { EntityComponentStorage } from './entityComponentStorage';
import { GroupManager } from './groupManager';
import { IdManager } from './idManager';
import { EntityPool } from './pool/entityPool';
import { ISystem } from './system';
import { SystemRegistry } from './systemRegistry';

export class World {
  private _componentPoolManager: ComponentPoolManager;
  private _componentStorage: EntityComponentStorage;
  private _groupManager: GroupManager;
  private _systemRegistry: SystemRegistry;
  private _entityPool: EntityPool;
  private _entityIdManager = new IdManager();

  constructor() {
    const componentIdManager = new IdManager();
    this._componentPoolManager = new ComponentPoolManager(componentIdManager);
    this._componentStorage = new EntityComponentStorage(
      this._componentPoolManager
    );
    this._groupManager = new GroupManager(this._componentStorage);
    this._entityPool = new EntityPool(
      () =>
        new Entity(this._entityIdManager.generateId(), this._componentStorage),
      (entity: Entity) => {
        this._componentStorage.removeEntity(entity.id);
        this._groupManager.entityUpdated(entity);
      },
      10
    );
    this._systemRegistry = new SystemRegistry(this._entityPool, this._groupManager);
  }

  public init(deltaTime: number): void {
    this._systemRegistry.initSystem(deltaTime);
  }

  public createEntity(): Entity {
    const entity = this._entityPool.acquire();
    this._groupManager.entityUpdated(entity);
    return entity;
  }

  public removeEntity(entity: Entity): void {
    this._entityPool.release(entity);
  }

  public registerComponentType<T extends IComponent>(
    type: IComponentConstructor<T>,
    initialSize: number,
    createParams: () => any[],
    deactivateParams: (component: T) => void
  ): void {
    this._componentPoolManager.registerComponentType(
      type,
      initialSize,
      createParams,
      deactivateParams
    );
  }

  public registerSystem(system: ISystem, priority: number, initSystem?: boolean): this {
    if (system.hasOwnProperty('world')) {
      system.world = this;
    }

    this._systemRegistry.registerSystem(system, priority, initSystem);

    return this;
  }

  public removeSystem(system: ISystem): this {
    this._systemRegistry.removeSystem(system);

    return this;
  }

  public update(deltaTime: number): void {
    this._systemRegistry.updateSystems(deltaTime);
  }
}
