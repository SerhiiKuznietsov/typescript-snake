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

  constructor(private _w: World) {}

  public addSystem(system: ISystem): this {
    if (system.init) system.init();

    this._systems.push(system);
    this._w.bus.emit('SYSTEM_ADDED', { system: system.constructor.name });

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

      this._w.bus.emit('SYSTEM_BEFORE_UPDATED', {
        system: system.constructor.name,
      });

      system.update({ deltaTime });

      this._w.bus.emit('SYSTEM_UPDATED', {
        system: system.constructor.name,
      });

      if (system.oneShot) {
        this.removeSystem(system);
        i--;
      }
    }

    this._w.task.processCycleUpdate();
  }

  public removeSystem(system: ISystem): void {
    if (system.destroy) system.destroy();

    const index = this._systems.indexOf(system);

    if (index === -1) {
      console.warn(`System not found in registry:`, system.constructor.name);
    }

    this._systems.splice(index, 1);

    this._w.bus.emit('SYSTEM_DESTROYED', { system: system.constructor.name });
  }

  public destroy(): void {
    for (let i = 0; i < this._systems.length; i++) {
      this.removeSystem(this._systems[i]);
    }

    this._systems = [];
  }
}
