import { IComponent, IComponentConstructor } from './component';
import { EntityComponentStorage } from './entityComponentStorage';

export class Entity {
  public readonly id: number;
  private _componentStorage: EntityComponentStorage;

  constructor(id: number, componentStorage: EntityComponentStorage) {
    this.id = id;
    this._componentStorage = componentStorage;
  }

  public add<T extends IComponent>(type: IComponentConstructor<T>): this {
    this._componentStorage.add(this.id, type);

    return this;
  }

  public remove<T extends IComponent>(type: IComponentConstructor<T>): this {
    this._componentStorage.remove(this.id, type);

    return this;
  }

  public get<T extends IComponent>(type: IComponentConstructor<T>): T {
    const component = this._componentStorage.get(this.id, type);

    if (!component) {
      throw new Error(
        `entity with id: "${this.id} not have component by name: "${type.name}"`
      );
    }

    return component;
  }

  public has<T extends IComponent>(type: IComponentConstructor<T>): boolean {
    return this._componentStorage.has(this.id, type);
  }

  public getAll(): IComponent[] {
    return this._componentStorage.getAll(this.id);
  }
}
