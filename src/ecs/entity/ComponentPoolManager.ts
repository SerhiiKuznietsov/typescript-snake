import { IComponent, IComponentConstructor } from '../Component';
import { ObjectPool } from '../ObjectPool';

export class ComponentPoolManager {
  private _componentPools: Map<string, ObjectPool<IComponent>> = new Map();

  public hasComponent(componentKey: string): boolean {
    return this._componentPools.has(componentKey);
  }

  public acquireComponent<T extends IComponent>(
    componentKey: string,
    componentType: IComponentConstructor<T>,
    args: any[]
  ): T {
    if (!this.hasComponent(componentKey)) {
      const factory = () => new componentType(...args);

      this._componentPools.set(
        componentKey,
        new ObjectPool<IComponent>(factory, 1)
      );
    }
    return this._componentPools.get(componentKey)!.acquire() as T;
  }

  public releaseComponent(componentKey: string, component: IComponent): void {
    this._componentPools.get(componentKey)?.release(component);
  }

  public clear(): void {
    this._componentPools.clear();
  }
}
