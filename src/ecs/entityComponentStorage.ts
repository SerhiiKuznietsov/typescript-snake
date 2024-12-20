import { IComponent, IComponentConstructor } from './Component';
import { EcsEvents } from './EcsEvents';
import { EntityId } from './Entity';
import { BitMapManager } from './entity/BitMapManager';
import {
  ComponentPoolManager,
  IComponentPool,
} from './entity/ComponentPoolManager';
import { EntityStorage } from './entity/EntityStorage';
import { EventBus } from './EventBus';
import { IdManager } from './idManager';

export type ComponentMapType = Map<string, IComponent>;

const getComponentKey = <T extends IComponent>(
  componentType: IComponentConstructor<T>
): string => componentType.name;

export class EntityComponentStorage {
  private _componentId = new IdManager();
  private _componentPoolManager = new ComponentPoolManager();
  private _entityStorage = new EntityStorage();
  private _entityBitMaps = new BitMapManager();

  constructor(private _eventBus: EventBus) {}

  public get bitMap() {
    return this._entityBitMaps;
  }

  public createEntity(): EntityId {
    const entityId = this._entityStorage.createEntity();

    this._entityBitMaps.createEntity(entityId);

    this._eventBus.emit(EcsEvents.ENTITY_CREATED, { entityId });

    return entityId;
  }

  public deleteEntity(entityId: EntityId): void {
    const entityComponents = this._entityStorage.getComponents(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with id: "${entityId}" not found`);
    }

    entityComponents.forEach((component, componentKey) => {
      this._componentPoolManager.releaseComponent(componentKey, component);
    });

    this._entityStorage.deleteEntity(entityId);
    this._entityBitMaps.deleteEntity(entityId);

    this._eventBus.emit(EcsEvents.ENTITY_DELETED, { entityId });
  }

  public registerComponent<T extends IComponent>(
    name: string,
    pool: IComponentPool<T>
  ): void {
    this._componentPoolManager.register(name, pool);
  }

  public addComponent<T extends IComponent>(
    entityId: EntityId,
    componentType: IComponentConstructor<T>,
    params?: Partial<T>
  ): T {
    if (!this._entityStorage.hasEntity(entityId)) {
      throw new Error(`Entity with ID ${entityId} does not exist.`);
    }

    const componentKey = getComponentKey(componentType);

    const component = this._componentPoolManager.acquireComponent(
      componentKey,
      params
    );

    this._entityStorage.addComponent(entityId, componentKey, component);

    this._entityBitMaps.addComponentBitToEntity(entityId, componentKey);

    this._eventBus.emit(EcsEvents.COMPONENT_ADDED, { entityId, componentType });

    return component;
  }

  public removeComponent<T extends IComponent>(
    entityId: EntityId,
    componentType: IComponentConstructor<T>
  ): void {
    if (!this._entityStorage.hasEntity(entityId)) {
      throw new Error(`Entity with ID: "${entityId}" does not exist.`);
    }

    const componentKey = getComponentKey(componentType);

    const component = this._entityStorage.getComponent(entityId, componentKey);
    this._entityStorage.removeComponent(entityId, componentKey);
    this._componentPoolManager.releaseComponent(componentKey, component);

    this._entityBitMaps.removeComponentBitFromEntity(entityId, componentKey);

    this._eventBus.emit(EcsEvents.COMPONENT_REMOVED, {
      entityId,
      componentType,
    });
  }

  public getComponent<T extends IComponent>(
    entityId: EntityId,
    componentType: IComponentConstructor<T>
  ): T {
    const componentKey = getComponentKey(componentType);

    return this._entityStorage.getComponent(entityId, componentKey) as T;
  }

  public getComponents(entityId: EntityId): Map<string, IComponent> {
    return this._entityStorage.getComponents(entityId);
  }

  public hasComponent<T extends IComponent>(
    entityId: EntityId,
    componentType: IComponentConstructor<T>
  ): boolean {
    const componentKey = getComponentKey(componentType);

    return this._entityStorage.hasComponent(entityId, componentKey);
  }

  public getAllEntities(): EntityId[] {
    return this._entityStorage.getAllEntities();
  }

  public destroy() {
    this._entityStorage.clear();
    this._componentPoolManager.clear();
    this._componentId.clear();
    this._entityBitMaps.clear();
  }
}
