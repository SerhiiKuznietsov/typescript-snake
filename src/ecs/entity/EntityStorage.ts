import { IComponent } from '../Component';
import { ComponentMapType } from '../EntityComponentStorage';
import { IdManager } from '../idManager';

export class EntityStorage {
  private _components: Map<number, ComponentMapType> = new Map();
  private _entityId = new IdManager();

  public hasEntity(entityId: number): boolean {
    return this._components.has(entityId);
  }

  public createEntity(): number {
    const entityId = this._entityId.generateId();
    this._components.set(entityId, new Map());
    return entityId;
  }

  public deleteEntity(entityId: number): void {
    this._components.delete(entityId);
  }

  public getComponents(entityId: number): ComponentMapType {
    const componentsMap = this._components.get(entityId);
    if (!componentsMap) {
      throw new Error(`Components for entity: ${entityId} not found`);
    }
    return componentsMap;
  }

  public hasComponent(entityId: number, componentKey: string): boolean {
    const components = this._components.get(entityId);
    return components?.has(componentKey) || false;
  }

  public getComponent<T extends IComponent>(
    entityId: number,
    componentKey: string
  ): T {
    const components = this._components.get(entityId);
    const component = components?.get(componentKey);
    if (!component) {
      throw new Error(
        `Component with key: "${componentKey}" not found for entity: ${entityId}`
      );
    }
    return component as T;
  }

  public addComponent(
    entityId: number,
    componentKey: string,
    component: IComponent
  ): void {
    const entityComponents = this._components.get(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with ID ${entityId} does not exist.`);
    }
    entityComponents.set(componentKey, component);
  }

  public removeComponent(entityId: number, componentKey: string): void {
    const entityComponents = this._components.get(entityId);
    if (!entityComponents) {
      throw new Error(`Entity with ID: "${entityId}" does not exist.`);
    }

    if (!entityComponents.has(componentKey)) {
      throw new Error(
        `Component with key: "${componentKey}" not found for entity: ${entityId}`
      );
    }

    entityComponents.delete(componentKey);
  }

  public getAllEntities(): number[] {
    return Array.from(this._components.keys());
  }

  public clear(): void {
    this._components.clear();
    this._entityId.clear();
  }
}
