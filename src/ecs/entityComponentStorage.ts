import { IComponent, IComponentConstructor } from './Component';
import { EcsEvents } from './EcsEvents';
import { ComponentPoolManager } from './entity/ComponentPoolManager';
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

  constructor(private _eventBus: EventBus) {}

  public createEntity(): number {
    const entityId = this._entityStorage.createEntity();

    this._eventBus.emit(EcsEvents.ENTITY_CREATED, { entityId });

    return entityId;
  }

  public deleteEntity(entityId: number): void {
    const entityComponents = this._entityStorage.getComponents(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with id: "${entityId}" not found`);
    }

    entityComponents.forEach((component, componentKey) => {
      this._componentPoolManager.releaseComponent(componentKey, component);
    });

    this._entityStorage.deleteEntity(entityId);

    this._eventBus.emit(EcsEvents.ENTITY_DELETED, { entityId });
  }

  public addComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>,
    args: any[]
  ): T {
    if (!this._entityStorage.hasEntity(entityId)) {
      throw new Error(`Entity with ID ${entityId} does not exist.`);
    }

    const componentKey = getComponentKey(componentType);

    const component = this._componentPoolManager.acquireComponent(
      componentKey,
      componentType,
      args
    );

    this._entityStorage.addComponent(entityId, componentKey, component);

    this._eventBus.emit(EcsEvents.COMPONENT_ADDED, { entityId, componentType });

    return component;
  }

  public removeComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>
  ): void {
    if (!this._entityStorage.hasEntity(entityId)) {
      throw new Error(`Entity with ID: "${entityId}" does not exist.`);
    }

    const componentKey = getComponentKey(componentType);

    const component = this._entityStorage.getComponent(entityId, componentKey);
    this._entityStorage.removeComponent(entityId, componentKey);
    this._componentPoolManager.releaseComponent(componentKey, component);

    this._eventBus.emit(EcsEvents.COMPONENT_REMOVED, {
      entityId,
      componentType,
    });
  }

  public getComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>
  ): T {
    const componentKey = getComponentKey(componentType);

    return this._entityStorage.getComponent(entityId, componentKey) as T;
  }

  public getComponents(entityId: number): Map<string, IComponent> {
    return this._entityStorage.getComponents(entityId);
  }

  public hasComponent<T extends IComponent>(
    entityId: number,
    componentType: IComponentConstructor<T>
  ): boolean {
    const componentKey = getComponentKey(componentType);

    return this._entityStorage.hasComponent(entityId, componentKey);
  }

  public getAllEntities(): number[] {
    return this._entityStorage.getAllEntities();
  }

  public destroy() {
    this._entityStorage.clear();
    this._componentPoolManager.clear();
    this._componentId.clear();
  }
}
