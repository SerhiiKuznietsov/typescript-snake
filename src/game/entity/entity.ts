import { Component } from '../component/component';
import { entityComponentObserver } from '../observable/entityComponent';

export class Entity {
  private _components: Map<string, Component> = new Map();
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public has<T extends Component>(componentClass: {
    new (...args: any[]): T;
  }): boolean {
    return this._components.has(componentClass.name);
  }

  public get<T extends Component>(componentClass: {
    new (...args: any[]): T;
  }): T {
    const component = this._components.get(componentClass.name) as T;

    if (!component) {
      throw new Error(
        `component with name "${componentClass.name}" not found for entity "${this.name}"`
      );
    }

    return component;
  }

  public add(component: Component): this {
    this._components.set(component.constructor.name, component);

    entityComponentObserver.notify({ entity: this, operation: 1 });

    return this;
  }

  public remove<T extends Component>(componentClass: {
    new (...args: any[]): T;
  }): void {
    if (!this.has(componentClass)) {
      throw new Error(
        `component class with name "${componentClass.name}" not found`
      );
    }

    this._components.delete(componentClass.name);

    entityComponentObserver.notify({ entity: this, operation: 0 });
  }
}
