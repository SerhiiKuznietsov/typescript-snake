import { ComponentMap } from '@/game/component/components';
import { IComponent } from './Component';
import { EventMap } from './EcsEvents';
import { EntityId } from './Entity';
import {
  ComponentPoolManager,
  IComponentPool,
} from './entity/ComponentPoolManager';
import { EventBus } from './EventBus';

export type ComponentMapType = Map<string, IComponent>;

export class ComponentStorage {
  private _componentPoolManager = new ComponentPoolManager();
  private _components: Map<EntityId, ComponentMapType> = new Map();

  constructor(private _eventBus: EventBus<EventMap>) {}

  private applyComponentParams<K extends keyof ComponentMap>(
    component: ComponentMap[K],
    params?: Partial<ComponentMap[K]>
  ): void {
    if (!params) return;

    for (const key in params) {
      component[key] = params[key]!;
    }
  }

  public hasEntity(entity: EntityId): boolean {
    return this._components.has(entity);
  }

  public createEntity(entity: EntityId): EntityId {
    this._components.set(entity, new Map());

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
    componentName: K,
    params?: Partial<ComponentMap[K]>
  ): ComponentMap[K] {
    const components = this._components.get(entity);
    const component = components?.get(componentName) as ComponentMap[K];
    if (!component) {
      throw new Error(
        `Component with key: "${componentName}" not found for entity: ${entity}`
      );
    }

    this.applyComponentParams(component, params);

    return component;
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
      componentName
    ) as ComponentMap[K];

    this.applyComponentParams(component, params);

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

  public destroy() {
    this._componentPoolManager.clear();
    this._components.clear();
  }
}
