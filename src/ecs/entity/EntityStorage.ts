import { IComponent } from '../Component';
import { EntityId } from '../Entity';
import { ComponentMapType } from '../EntityComponentStorage';
import { IdManager } from '../idManager';

export class EntityStorage {
  private _components: Map<EntityId, ComponentMapType> = new Map();
  private _entityId = new IdManager();

  public hasEntity(entity: EntityId): boolean {
    return this._components.has(entity);
  }

  public createEntity(): EntityId {
    const entity = this._entityId.generateId();
    this._components.set(entity, new Map());
    return entity;
  }

  public deleteEntity(entity: EntityId): void {
    this._components.delete(entity);
  }

  public getComponents(entity: EntityId): ComponentMapType {
    const componentsMap = this._components.get(entity);
    if (!componentsMap) {
      throw new Error(`Components for entity: ${entity} not found`);
    }
    return componentsMap;
  }

  public hasComponent(entity: EntityId, componentKey: string): boolean {
    const components = this._components.get(entity);
    return components?.has(componentKey) || false;
  }

  public getComponent<T extends IComponent>(
    entity: EntityId,
    componentKey: string
  ): T {
    const components = this._components.get(entity);
    const component = components?.get(componentKey);
    if (!component) {
      throw new Error(
        `Component with key: "${componentKey}" not found for entity: ${entity}`
      );
    }
    return component as T;
  }

  public addComponent(
    entity: EntityId,
    componentKey: string,
    component: IComponent
  ): void {
    const entityComponents = this._components.get(entity);
    if (!entityComponents) {
      throw new Error(`Entity with ID ${entity} does not exist.`);
    }
    entityComponents.set(componentKey, component);
  }

  public removeComponent(entity: EntityId, componentKey: string): void {
    const entityComponents = this._components.get(entity);
    if (!entityComponents) {
      throw new Error(`Entity with ID: "${entity}" does not exist.`);
    }

    if (!entityComponents.has(componentKey)) {
      throw new Error(
        `Component with key: "${componentKey}" not found for entity: ${entity}`
      );
    }

    entityComponents.delete(componentKey);
  }

  public getAllEntities(): EntityId[] {
    return Array.from(this._components.keys());
  }

  public clear(): void {
    this._components.clear();
    this._entityId.clear();
  }
}
