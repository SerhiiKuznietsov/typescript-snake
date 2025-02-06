import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../managers/GridManager';

export class RespawnSystem implements ISystem {
  public entities = this.w.newGroup(['Respawn', 'RespawnReady']);

  constructor(
    public w: World,
    private _grid: GridManager,
  ) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const position = this.w.getComponent(entity, 'Position');
      const emptyPosition = this._grid.getEmptyCell();

      if (!emptyPosition) {
        throw new Error('Win');
      }

      vectorUtils.setVector(position, emptyPosition);

      this._grid.addEntity(entity, position);

      this.w.getComponent(entity, 'Reborn');
      this.w.removeComponent(entity, 'Reborn', 'BEFORE_SYSTEM');
      this.w.removeComponent(entity, 'RespawnReady');
      this.w.removeIfExistComponent(entity, 'Death');
    }
  }
}
