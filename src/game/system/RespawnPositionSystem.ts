import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { GridManager } from '../managers/GridManager';

export class RespawnPositionSystem implements ISystem {
  public entities = this.w.newGroup(['RespawnReady']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const emptyPosition = this._grid.getEmptyCell();

      if (!emptyPosition) {
        throw new Error('Win');
      }

      this.w.removeComponent(entity, 'RespawnReady');
      this.w.getComponent(entity, 'RespawnPosition', emptyPosition);
    }
  }
}
