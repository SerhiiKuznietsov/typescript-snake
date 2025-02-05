import { ComponentMap } from '@/game/component/components';
import { IComponent } from './Component';
import { EventMap } from './EcsEvents';
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
  private _componentPoolManager = new ComponentPoolManager();
  private _entityStorage = new EntityStorage();
  private _entityBitMaps = new BitMapManager();

  constructor(private _eventBus: EventBus<EventMap>) {}

  public get bitMap() {
    return this._entityBitMaps;
  }

  public hasEntity(entity: EntityId): boolean {
    return this._entityStorage.hasEntity(entity);
  }

  public createEntity(): EntityId {
    const entity = this._entityStorage.createEntity();

    this._entityBitMaps.createEntity(entity);

    this._eventBus.emit('ENTITY_CREATED', { entity });

    return entity;
  }

  public deleteEntity(entity: EntityId): void {
    const entityComponents = this._entityStorage.getComponents(entity);
    if (!entityComponents) {
      throw new Error(`Entity with id: "${entity}" not found`);
    }

    entityComponents.forEach((component, componentKey) => {
      this._componentPoolManager.releaseComponent(componentKey, component);
    });

    this._entityStorage.deleteEntity(entity);
    this._entityBitMaps.deleteEntity(entity);

    this._eventBus.emit('ENTITY_DELETED', { entity });
  }

  public registerComponent<K extends keyof ComponentMap>(
    componentName: K,
    pool: IComponentPool<ComponentMap[K]>
  ): void {
    this._componentPoolManager.register(componentName, pool);
  }

  public hasComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): boolean {
    return this._entityStorage.hasComponent(entity, componentName);
  }

  public getComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): ComponentMap[K] {
    return this._entityStorage.getComponent(entity, componentName);
  }

  public addComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    if (!this._entityStorage.hasEntity(entity)) {
      throw new Error(`Entity with ID ${entity} does not exist.`);
    }

    const component = this._componentPoolManager.acquireComponent(
      componentName,
      params
    );

    this._entityStorage.addComponent(entity, componentName, component);

    this._entityBitMaps.addComponentBitToEntity(entity, componentName);

    this._eventBus.emit('COMPONENT_ADDED', { entity, componentName });

    return component;
  }

  public removeComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): void {
    if (!this._entityStorage.hasEntity(entity)) {
      throw new Error(`Entity with ID: "${entity}" does not exist.`);
    }

    const component = this._entityStorage.getComponent(entity, componentName);
    this._entityStorage.removeComponent(entity, componentName);
    this._componentPoolManager.releaseComponent(componentName, component);

    this._entityBitMaps.removeComponentBitFromEntity(entity, componentName);

    this._eventBus.emit('COMPONENT_REMOVED', {
      entity,
      componentName,
    });
  }

  public getComponents(entity: EntityId): Map<string, IComponent> {
    return this._entityStorage.getComponents(entity);
  }

  public getAllEntities(): EntityId[] {
    return this._entityStorage.getAllEntities();
  }

  public destroy() {
    this._entityStorage.clear();
    this._componentPoolManager.clear();
    this._entityBitMaps.clear();
  }
}
