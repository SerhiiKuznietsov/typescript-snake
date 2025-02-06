import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { GridManager } from '../managers/GridManager';

export class RespawnSystem implements ISystem {
  public entities = this.w.newGroup(['RespawnPosition']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const respawnPosition = this.w.getComponent(entity, 'RespawnPosition');
      const position = this.w.getComponent(entity, 'Position', respawnPosition);

      this._grid.addEntity(entity, position);

      this.w.getComponent(entity, 'Reborn');
      this.w.removeComponent(entity, 'Reborn', 'BEFORE_SYSTEM');
      this.w.removeComponent(entity, 'RespawnPosition');
      this.w.removeIfExistComponent(entity, 'Death');
    }
  }
}
