export interface IComponent extends Record<string, any> {}

export interface IComponentConstructor<T extends IComponent> {
  new (...args: any[]): T;
}

export type ComponentConstructorList = IComponentConstructor<IComponent>[];
