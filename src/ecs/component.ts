export interface IComponent<T = Record<string, any>> {
  readonly id: number;
  data?: T;
}

export interface IComponentConstructor<T extends IComponent> {
  new (id: number, ...args: any[]): T;
}

export type ComponentConstructorList = IComponentConstructor<IComponent>[]