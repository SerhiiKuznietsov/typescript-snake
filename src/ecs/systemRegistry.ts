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

  constructor(private _world: World) {}

  public addSystem(system: ISystem): this {
    if (system.init) system.init();

    this._systems.push(system);

    return this;
  }

  public awakeSystems(): void {
    for (let i = 0; i < this._systems.length; i++) {
      const system = this._systems[i];

      system.awake && system.awake();
    }
  }

  public updateSystems(deltaTime: number): void {
    for (let i = 0; i < this._systems.length; i++) {
      const system = this._systems[i];

      this._world.task.setSystem(system.constructor.name);
      this._world.task.processBeforeSystem(system.constructor.name);
      system.update({ deltaTime });
      this._world.task.setSystem();

      if (system.oneShot) {
        this.removeSystem(system);
        i--;
      }
    }

    this._world.task.processCycleUpdate();
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
    for (let i = 0; i < this._systems.length; i++) {
      const system = this._systems[i];

      this.removeSystem(system);
    }

    this._systems = [];
  }
}
