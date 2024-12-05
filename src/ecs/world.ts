import { IComponent, IComponentConstructor } from './component';
import { ComponentPoolManager } from './manager/componentPoolManager';
import { Entity } from './entity';
import { EntityComponentStorage } from './entityComponentStorage';
import { GroupManager } from './manager/groupManager';
import { IdManager } from './manager/idManager';
import { EntityPool } from './pool/entityPool';
import { ISystem } from './system';
import { SystemRegistry } from './systemRegistry';

export class World {
  private _componentStorage = new EntityComponentStorage(new IdManager());
  private _groupManager = new GroupManager(this._componentStorage);
  private _systemRegistry = new SystemRegistry();
  private _entityIdManager = new IdManager();
  private _entityPool = new EntityPool(
    () =>
      new Entity(this._entityIdManager.generateId(), this._componentStorage),
    10,
    (entity: Entity) => {
      this._componentStorage.removeEntity(entity.id);
      this._groupManager.entityUpdated(entity);
    }
  );

  public init(deltaTime: number): void {
    const entities = this._entityPool.getAllObjects();

    this._systemRegistry.initSystem({ deltaTime, entities });
  }

  public update(deltaTime: number): void {
    const entities = this._entityPool.getAllObjects();

    this._systemRegistry.updateSystems({ deltaTime, entities });
  }

  public createEntity(): Entity {
    const entity = this._entityPool.acquire();
    this._groupManager.entityUpdated(entity);
    return entity;
  }

  public removeEntity(entity: Entity): void {
    this._entityPool.release(entity);
  }

  public registerSystem(
    system: ISystem,
    priority: number,
    initSystem?: boolean
  ): this {
    if (system.hasOwnProperty('world')) system.world = this;

    this._systemRegistry.registerSystem(system, priority, initSystem);

    this._groupManager.registerSystem(system);

    const entities = this._groupManager.getEntitiesForSystem(system);
    system.entities = [...entities.values()];

    return this;
  }

  public removeSystem(system: ISystem): this {
    if (system.hasOwnProperty('world')) delete system.world;

    this._systemRegistry.removeSystem(system);

    this._groupManager.unregisterSystem(system);

    system.entities = [];

    return this;
  }
}
