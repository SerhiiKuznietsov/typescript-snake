import { ComponentMap } from '@/game/component/components';
import { IComponent } from './Component';
import { EventMap } from './EcsEvents';
import { EntityId } from './Entity';
import { BitMapManager } from './entity/BitMapManager';
import {
  ComponentPoolManager,
  IComponentPool,
} from './entity/ComponentPoolManager';
import { EventBus } from './EventBus';
import { IdManager } from './idManager';

export type ComponentMapType = Map<string, IComponent>;

export class EntityComponentStorage {
  private _componentPoolManager = new ComponentPoolManager();
  private _components: Map<EntityId, ComponentMapType> = new Map();
  private _entityId = new IdManager();

  constructor(private _eventBus: EventBus<EventMap>) {}

  public hasEntity(entity: EntityId): boolean {
    return this._components.has(entity);
  }

  public createEntity(): EntityId {
    const entity = this._entityId.generateId();
    this._components.set(entity, new Map());

    this._eventBus.emit('ENTITY_CREATED', { entity });

    return entity;
  }

  public deleteEntity(entity: EntityId): void {
    if (!this.hasEntity(entity)) {
      throw new Error(`Entity with id: "${entity}" not found`);
    }

    const components = this._components.get(entity);
    components!.forEach((component, componentKey) => {
      this._componentPoolManager.releaseComponent(componentKey, component);
    });

    this._components.delete(entity);

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
    const components = this._components.get(entity);
    return components?.has(componentName) || false;
  }

  public getComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): ComponentMap[K] {
    const components = this._components.get(entity);
    const component = components?.get(componentName);
    if (!component) {
      throw new Error(
        `Component with key: "${componentName}" not found for entity: ${entity}`
      );
    }
    return component as ComponentMap[K];
  }

  public addComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    if (!this.hasEntity(entity)) {
      throw new Error(`Entity with ID ${entity} does not exist.`);
    }

    const component = this._componentPoolManager.acquireComponent(
      componentName,
      params
    );

    const entityComponents = this._components.get(entity);
    if (!entityComponents) {
      throw new Error(`Entity with ID ${entity} does not exist.`);
    }
    entityComponents.set(componentName, component);

    this._eventBus.emit('COMPONENT_ADDED', { entity, componentName });

    return component;
  }

  public removeComponent<K extends keyof ComponentMap>(
    entity: EntityId,
    componentName: K
  ): void {
    if (!this.hasEntity(entity)) {
      throw new Error(`Entity with ID: "${entity}" does not exist.`);
    }

    const entityComponents = this._components.get(entity);
    if (!entityComponents) {
      throw new Error(`Entity with ID: "${entity}" does not exist.`);
    }

    const component = entityComponents.get(componentName);
    if (!component) {
      throw new Error(
        `Component with key: "${componentName}" not found for entity: ${entity}`
      );
    }

    entityComponents.delete(componentName);

    this._componentPoolManager.releaseComponent(componentName, component);

    this._eventBus.emit('COMPONENT_REMOVED', {
      entity,
      componentName,
    });
  }

  public getComponents(entity: EntityId): ComponentMapType {
    const componentsMap = this._components.get(entity);
    if (!componentsMap) {
      throw new Error(`Components for entity: ${entity} not found`);
    }
    return componentsMap;
  }

  public getAllEntities(): EntityId[] {
    return Array.from(this._components.keys());
  }

  public destroy() {
    this._componentPoolManager.clear();
    this._components.clear();
    this._entityId.clear();
  }
}
