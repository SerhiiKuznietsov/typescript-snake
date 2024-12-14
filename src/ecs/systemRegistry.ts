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
}

export class SystemRegistry {
  private _systems: ISystem[] = [];

  constructor() {}

  public addSystem(system: ISystem): void {
    if (system.init) {
      system.init();
    }

    this._systems.push(system);
  }

  public awake() {
    this._systems.forEach(
      (system) => system.awake && system.awake()
    );
  }

  public updateSystems(deltaTime: number): void {
    this._systems.forEach((system) => system.update({ deltaTime }));
  }

  public removeSystem(system: ISystem): void {
    if (system.destroy) {
      system.destroy();
    }

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
