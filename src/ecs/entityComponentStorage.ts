import { IComponent, IComponentConstructor } from './component';
import { ComponentPoolManager } from './manager/componentPoolManager';
import { Entity } from './entity';

export class EntityComponentStorage {
  private _entityComponents: Map<number, Map<string, IComponent>> = new Map();
  private _componentPoolManager: ComponentPoolManager;

  constructor(componentPoolManager: ComponentPoolManager) {
    this._componentPoolManager = componentPoolManager;
  }

  public add<T extends IComponent>(
    entityId: number,
    type: IComponentConstructor<T>
  ): void {
    const typeName = type.name;
    const component = this._componentPoolManager.acquireComponent(type);
    if (!this._entityComponents.has(entityId)) {
      this._entityComponents.set(entityId, new Map<string, IComponent>());
    }
    this._entityComponents.get(entityId)!.set(typeName, component);
  }

  public remove<T extends IComponent>(
    entityId: number,
    type: IComponentConstructor<T>
  ): void {
    const typeName = type.name;
    const component = this._entityComponents.get(entityId)?.get(typeName);
    if (component) {
      this._entityComponents.get(entityId)?.delete(typeName);
      this._componentPoolManager.releaseComponent(type, component);
    }
  }

  public get<T extends IComponent>(
    entityId: number,
    { name }: IComponentConstructor<T>
  ): T | undefined {
    return this._entityComponents.get(entityId)?.get(name) as T | undefined;
  }

  public has<T extends IComponent>(
    entityId: number,
    { name }: IComponentConstructor<T>
  ): boolean {
    return this._entityComponents.get(entityId)?.has(name) ?? false;
  }

  public getAll(entityId: number): IComponent[] {
    return Array.from(this._entityComponents.get(entityId)?.values() ?? []);
  }

  public clear(entityId: number): void {
    const components = this._entityComponents.get(entityId);

    components?.forEach((component) => {
      this._componentPoolManager.releaseComponent(
        component.constructor as IComponentConstructor<IComponent>,
        component
      );
      components.clear();
    });
  }

  public removeEntity(entityId: number): void {
    this.clear(entityId);
    this._entityComponents.delete(entityId);
  }

  public getAllEntities(): Entity[] {
    return Array.from(this._entityComponents.keys()).map(
      (id) => new Entity(id, this)
    );
  }

  public onComponentAdded(entityId: number, componentType: string): void {}

  public onComponentRemoved(entityId: number, componentType: string): void {}
}
