import { ComponentMap } from '@/game/component/components';
import { IComponent } from './Component';
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

  public registerComponent<K extends keyof ComponentMap>(
    componentName: K,
    pool: IComponentPool<ComponentMap[K]>
  ): void {
    this._componentPoolManager.register(componentName, pool);
  }

  public hasComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K
  ): boolean {
    return this._entityStorage.hasComponent(entityId, componentName);
  }

  public getComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K
  ): ComponentMap[K] {
    return this._entityStorage.getComponent(entityId, componentName);
  }

  public addComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    if (!this._entityStorage.hasEntity(entityId)) {
      throw new Error(`Entity with ID ${entityId} does not exist.`);
    }

    const component = this._componentPoolManager.acquireComponent(
      componentName,
      params
    );

    this._entityStorage.addComponent(entityId, componentName, component);

    this._entityBitMaps.addComponentBitToEntity(entityId, componentName);

    this._eventBus.emit(EcsEvents.COMPONENT_ADDED, { entityId, componentName });

    return component;
  }

  public removeComponent<K extends keyof ComponentMap>(
    entityId: EntityId,
    componentName: K
  ): void {
    if (!this._entityStorage.hasEntity(entityId)) {
      throw new Error(`Entity with ID: "${entityId}" does not exist.`);
    }

    const component = this._entityStorage.getComponent(entityId, componentName);
    this._entityStorage.removeComponent(entityId, componentName);
    this._componentPoolManager.releaseComponent(componentName, component);

    this._entityBitMaps.removeComponentBitFromEntity(entityId, componentName);

    this._eventBus.emit(EcsEvents.COMPONENT_REMOVED, {
      entityId,
      componentName,
    });
  }

  public getComponents(entityId: EntityId): Map<string, IComponent> {
    return this._entityStorage.getComponents(entityId);
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
