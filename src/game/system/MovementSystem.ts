import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { RenderEvents } from './events/render';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup(['Position', 'MoveTo']);
  public needClearEntities = this.w.newGroup(['Moved']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.needClearEntities.length; i++) {
      const entity = this.needClearEntities[i];

      this.w.removeComponent(entity, 'Moved');
    }

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const position = this.w.getComponent(entity, 'Position');
      const moveTo = this.w.getComponent(entity, 'MoveTo');

      this._grid.moveEntity(entity, moveTo);

      const prevPosition = this.w.getComponent(entity, 'PrevPosition');

      vectorUtils.setVector(prevPosition, position);
      vectorUtils.setVector(position, moveTo);

      this.w.getComponent(entity, 'Moved');
      this.w.removeComponent(entity, 'MoveTo');
    }
  }
}
