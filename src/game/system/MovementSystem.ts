import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { GridManager } from '../managers/GridManager';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup(['Position', 'MoveTo']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const moveTo = this.w.getComponent(entity, 'MoveTo');

      this._grid.moveEntity(entity, moveTo);

      this.w.getComponent(entity, 'Position', moveTo);
      this.w.removeComponent(entity, 'MoveTo');
      this.w.getComponent(entity, 'Moved');
      this.w.removeComponent(entity, 'Moved', 'BEFORE_SYSTEM');
    }
  }
}
