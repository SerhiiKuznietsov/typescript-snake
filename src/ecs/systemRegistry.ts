import { GroupManager } from './groupManager';
import { EntityPool } from './pool/entityPool';
import { ISystem } from './system';

type SystemList = { system: ISystem; priority: number; initSystem: boolean }[];

export class SystemRegistry {
  private _systems: SystemList = [];

  constructor(private _entityPool: EntityPool, private _groupManager: GroupManager) {}

  public registerSystem(
    system: ISystem,
    priority: number,
    initSystem: boolean = false
  ): void {
    this._systems.push({ system, priority, initSystem });
    this._systems.sort((a, b) => a.priority - b.priority);
    this._groupManager.registerSystem(system);

    const entities = this._groupManager.getEntitiesForSystem(system);
    system.entities = [...entities.values()];
  }

  public removeSystem(system: ISystem): void {
    this._systems = this._systems.filter((s) => s.system !== system);
    this._groupManager.unregisterSystem(system);

    system.entities = [];
  }

  public initSystem(deltaTime: number): void {
    this._systems.forEach(({ system, initSystem }) => {
      if (!initSystem) return;

      const entities = this._entityPool.getAllObjects();
      system.update({ deltaTime, entities });
    });
  }

  public updateSystems(deltaTime: number): void {
    this._systems.forEach(({ system }) => {

      const entities = this._entityPool.getAllObjects();
      system.update({ deltaTime, entities });
    });
  }
}
