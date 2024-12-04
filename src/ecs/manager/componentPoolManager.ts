import { IComponent, IComponentConstructor } from '../component';
import { IdManager } from './idManager';
import { ComponentPool } from '../pool/componentPool';

export class ComponentPoolManager {
  private _componentPools: Map<string, ComponentPool> = new Map();

  constructor(private _idManager: IdManager) {}

  public registerComponentType<T extends IComponent>(
    Constructor: IComponentConstructor<T>,
    initialSize: number,
    createParams?: () => any[],
  ): void {
    const { name: typeName } = Constructor;

    if (this._componentPools.has(typeName)) return;

    const createItemFunc =  () => {
      const values = !!createParams ? createParams() : [];

      return new Constructor(this._idManager.generateId(), ...values);
    }

    const pool = new ComponentPool(
      createItemFunc,
      initialSize
    );

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
