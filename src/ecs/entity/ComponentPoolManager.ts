import { IComponent } from '../Component';

export interface IComponentPool<T> {
  acquire(params?: Partial<T>): T;
  release(component: IComponent): void;
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

  public acquireComponent<T extends IComponent>(
    name: string,
    params?: Partial<T>
  ): T {
    if (!this.hasPool(name)) {
      throw new Error(`Component pool with name: "${name}" not found`);
    }
    return this._componentPools.get(name)!.acquire(params) as T;
  }

  public releaseComponent(name: string, component: IComponent): void {
    this._componentPools.get(name)?.release(component);
  }

  public clear(): void {
    this._componentPools.clear();
  }
}
