import { IComponent } from '../Component';

export interface IComponentPool<T> {
  acquire(params?: Partial<T>): T;
  release(component: IComponent): void;
  reset(size?: number): void;
  get currentSize(): number;
  get activeCount(): number;
  get inactiveCount(): number;
}

export class ComponentPoolManager {
  private _componentPools: Map<string, IComponentPool<IComponent>> = new Map();

  public register<T extends IComponent>(name: string, pool: IComponentPool<T>) {
    if (this.hasPool(name)) {
      throw new Error(`Duplicate component pool with name: "${name}"`);
    }

    this._componentPools.set(name, pool);
  }

  public hasPool(componentKey: string): boolean {
    return this._componentPools.has(componentKey);
  }

  public acquireComponent<T extends IComponent>(name: string): T {
    const pool = this._componentPools.get(name);
    if (!pool) {
      throw new Error(`Component pool with name: "${name}" not found`);
    }

    return pool.acquire() as T;
  }

  public releaseComponent(name: string, component: IComponent): void {
    const pool = this._componentPools.get(name);
    if (!pool) {
      throw new Error(`Component pool with name: "${name}" not found`);
    }

    pool.release(component);
  }

  public clear(): void {
    this._componentPools.forEach((pool) =>  pool.reset());
    this._componentPools.clear();
  }
}
