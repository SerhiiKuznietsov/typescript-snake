import { World } from './World';

export interface UpdateSystemData {
  deltaTime: number;
}

export interface ISystem {
  w: World;
  init?(): void;
  awake?(): void;
  update(data: UpdateSystemData): void;
  destroy?(): void;
  oneShot?: boolean;
}

export class SystemRegistry {
  private _systems: ISystem[] = [];

  public addSystem(system: ISystem): this {
    if (system.init) system.init();

    this._systems.push(system);

    return this;
  }

  public awakeSystems(): void {
    this._systems.forEach((system) => system.awake && system.awake());
  }

  public updateSystems(deltaTime: number): void {
    for (let i = 0; i < this._systems.length; i++) {
      const system = this._systems[i];
      system.update({ deltaTime });

      if (system.oneShot) {
        this.removeSystem(system);
        i--;
      }
    }
  }

  public removeSystem(system: ISystem): void {
    if (system.destroy) system.destroy();

    const index = this._systems.indexOf(system);
    if (index !== -1) {
      this._systems.splice(index, 1);
    } else {
      console.warn(`System not found in registry:`, system);
    }
  }

  public destroy(): void {
    this._systems.forEach((system) => {
      this.removeSystem(system);
    });
    this._systems = [];
  }
}
