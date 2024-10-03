import { ISystem, UpdateSystemData } from './system';

type SystemList = { system: ISystem; priority: number; initSystem: boolean }[];

export class SystemRegistry {
  private _systems: SystemList = [];

  public registerSystem(
    system: ISystem,
    priority: number,
    initSystem: boolean = false
  ): void {
    this._systems.push({ system, priority, initSystem });
    this._systems.sort((a, b) => a.priority - b.priority);
  }

  public removeSystem(system: ISystem): void {
    this._systems = this._systems.filter((s) => s.system !== system);
  }

  public initSystem(data: UpdateSystemData): void {
    this._systems.forEach(
      ({ system, initSystem }) => initSystem && system.update(data)
    );
  }

  public updateSystems(data: UpdateSystemData): void {
    this._systems.forEach(({ system }) => system.update(data));
  }
}
