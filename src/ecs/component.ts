export interface IComponent {
  readonly id: number;
  [key: string]: any;
}

export interface IComponentConstructor<T extends IComponent> {
  new (id: number, ...args: any[]): T;
}
