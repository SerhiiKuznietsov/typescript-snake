import { IComponent, IComponentConstructor } from './component';
import { IdManager } from './idManager';
import { ComponentPool } from './pool/componentPool';

export class ComponentPoolManager {
  private _componentPools: Map<string, ComponentPool> = new Map();

  constructor(private _idManager: IdManager) {}

  public registerComponentType<T extends IComponent>(
    type: IComponentConstructor<T>,
    initialSize: number,
    createParams: () => any[],
    deactivateParams: (component: T) => void
  ): void {
    const typeName = type.name;
    if (this._componentPools.has(typeName)) return;

    const pool = new ComponentPool(
      () => {
        return new type(this._idManager.generateId(), ...createParams());
      },
      /* @ts-ignore */
      deactivateParams,
      initialSize
    );

    /* @ts-ignore */
    this._componentPools.set(typeName, pool);
  }

  public acquireComponent<T extends IComponent>(
    type: IComponentConstructor<T>
  ): T {
    const typeName = type.name;
    const pool = this._componentPools.get(typeName);
    if (!pool) {
      throw new Error(`No pool registered for component type: ${typeName}`);
    }
    return pool.acquire() as T;
  }

  public releaseComponent<T extends IComponent>(
    type: IComponentConstructor<T>,
    component: T
  ): void {
    const typeName = type.name;
    const pool = this._componentPools.get(typeName);
    if (!pool) {
      throw new Error(`No pool registered for component type: ${typeName}`);
    }
    pool.release(component);
  }
}
