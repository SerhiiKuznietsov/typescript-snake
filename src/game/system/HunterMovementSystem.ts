import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { RenderEvents } from './events/render';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';

export class HunterMovementSystem implements ISystem {
  public entities = this.w.newGroup(['Hunter', 'Position', 'MoveTo']);
  public needClearEntities = this.w.newGroup(['Hunter', 'Moved'], ['MoveTo']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    this.needClearEntities.forEach((entity) => {
      this.w.removeComponent(entity, 'Moved');
    });

    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, 'Position');
      const moveTo = this.w.getComponent(entity, 'MoveTo');

      this._grid.moveEntity(entity, position, moveTo);

      const prevPosition = vectorUtils.copy(position);

      vectorUtils.setVector(position, moveTo);

      this.w.messageBroker
        .publish(RenderEvents.NEW_RENDER, entity)
        .publish(RenderEvents.CLEAN_RENDER, {
          x: prevPosition.x,
          y: prevPosition.y,
        });

      this.w.getComponent(entity, 'Moved');
    });
  }
}
