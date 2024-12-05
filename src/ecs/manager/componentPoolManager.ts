import { IComponent, IComponentConstructor } from '../component';
import { IdManager } from './idManager';
import { ComponentPool } from '../pool/componentPool';

interface IIdManager {
  generateId: () => number;
}

export class ComponentPoolManager {
  private _componentPools: Map<string, ComponentPool> = new Map();

  constructor(private _idManager: IIdManager) {}

  public hasComponentType<T extends IComponent>(
    Constructor: IComponentConstructor<T>
  ): boolean {
    const { name: typeName } = Constructor;

    return this._componentPools.has(typeName);
  }

  public registerComponentType<T extends IComponent>(
    Constructor: IComponentConstructor<T>,
    initialSize: number
  ): void {
    const { name: typeName } = Constructor;

    if (this._componentPools.has(typeName)) return;

    const createItemFunc = () => {
      return new Constructor(this._idManager.generateId());
    };

    const pool = new ComponentPool(createItemFunc, initialSize);

    this._componentPools.set(typeName, pool);
  }

  public acquireComponent<T extends IComponent>({
    name,
  }: IComponentConstructor<T>): T {
    const pool = this._componentPools.get(name);

    if (!pool) {
      throw new Error(`No pool registered for component type: ${name}`);
    }

    return pool.acquire() as T;
  }

  public releaseComponent<T extends IComponent>(
    { name }: IComponentConstructor<T>,
    component: T
  ): void {
    const pool = this._componentPools.get(name);

    if (!pool) {
      throw new Error(`No pool registered for component type: ${name}`);
    }
    pool.release(component);
  }
}
