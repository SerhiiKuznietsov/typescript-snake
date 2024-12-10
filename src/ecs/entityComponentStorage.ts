import { IComponent, IComponentConstructor } from './component';
import { EcsEvents } from './EcsEvents';
import { EventBus } from './EventBus';
import { ObjectPool } from './pool';

export type ComponentMapType = Map<string, IComponent>;

export class EntityComponentStorage {
  private _components: Map<number, ComponentMapType> = new Map();
  private _componentPools: Map<string, ObjectPool<IComponent>> = new Map();
  private _nextEntityId: number = 1;
  private _nextComponentId: number = 1;

  constructor(private _eventBus: EventBus) {}

  public createEntity(): number {
    const entityId = this._nextEntityId++;
    this._components.set(entityId, new Map());

    this._eventBus.emit(EcsEvents.ENTITY_CREATED, { entityId });

    return entityId;
  }

  public deleteEntity(entityId: number): void {
    const entityComponents = this._components.get(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with id: "${entityId}" not found`);
    }

    entityComponents.forEach((component, componentKey) => {
      this.releaseComponent(componentKey, component);
    });
    this._components.delete(entityId);

    this._eventBus.emit(EcsEvents.ENTITY_DELETED, { entityId });
  }

  public addComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>,
    args: any[]
  ): T {
    const componentKey = this.getComponentKey(componentType);
    const entityComponents = this._components.get(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with ID ${entityId} does not exist.`);
    }

    const component = this.acquireComponent(componentKey, () => {
      const componentId = this._nextComponentId++;
      return new componentType(componentId, ...args);
    });
    entityComponents.set(componentKey, component);

    this._eventBus.emit(EcsEvents.COMPONENT_ADDED, { entityId, componentType });

    return component;
  }

  public removeComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>
  ): void {
    const componentKey = this.getComponentKey(componentType);
    const entityComponents = this._components.get(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with ID ${entityId} does not exist.`);
    }

    const component = entityComponents.get(componentKey);
    if (component) {
      this.releaseComponent(componentKey, component);
      entityComponents.delete(componentKey);

      this._eventBus.emit(EcsEvents.COMPONENT_REMOVED, {
        entityId,
        componentType,
      });
    }
  }

  public getComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>
  ): T {
    const key = this.getComponentKey(componentType);
    const entityComponents = this._components.get(entityId);

    const findComponent = entityComponents?.get(key);

    if (!findComponent) {
      throw new Error(
        `Component with key: "${key}" no found for entity: ${entityId}`
      );
    }

    return findComponent as T;
  }

  public getComponents(entityId: number): Map<string, IComponent> {
    const componentsMap = this._components.get(entityId);

    if (!componentsMap) {
      throw new Error(`Component for entity: ${entityId} not found`);
    }

    return componentsMap;
  }

  public hasComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>
  ): boolean {
    const componentKey = this.getComponentKey(componentType);
    const entityComponents = this._components.get(entityId);
    return entityComponents?.has(componentKey) || false;
  }

  private acquireComponent<T extends IComponent>(
    componentKey: string,
    factory: () => T
  ): T {
    if (!this._componentPools.has(componentKey)) {
      this._componentPools.set(
        componentKey,
        new ObjectPool<IComponent>(factory, 1, this.resetComponent)
      );
    }
    return this._componentPools.get(componentKey)!.acquire() as T;
  }

  private releaseComponent(componentKey: string, component: IComponent): void {
    this._componentPools.get(componentKey)?.release(component);
  }

  private resetComponent(component: IComponent): void {
    if (component.data) {
      for (const key of Object.keys(component.data)) {
        (component.data as any)[key] = undefined;
      }
    }
  }

  private getComponentKey<T extends IComponent>(
    componentType: IComponentConstructor<T>
  ): string {
    return componentType.name;
  }

  public getAllEntities(): number[] {
    return Array.from(this._components.keys());
  }
}
