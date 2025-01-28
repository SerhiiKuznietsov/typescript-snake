import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup(['Position', 'MoveTo']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const prevPosition = this.w.getComponent(entity, 'PrevPosition');
      const position = this.w.getComponent(entity, 'Position');
      const moveTo = this.w.getComponent(entity, 'MoveTo');

      this._grid.moveEntity(entity, moveTo);

      vectorUtils.setVector(prevPosition, position);
      vectorUtils.setVector(position, moveTo);

      this.w.getComponent(entity, 'Moved');
      this.w.removeComponent(entity, 'MoveTo');
      this.w.removeComponent(entity, 'Moved', 'BEFORE_SYSTEM');
    }
  }
}
