import { Position } from '../component/Position';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { PrevPosition } from '../component/PrevPosition';
import { MoveTo } from '../component/MoveTo';
import { GridManager } from '../GridManager';
import { RenderEvents } from './events/render';

export class MovementSystem implements ISystem {
  public entities = this.w.newGroup([Position, MoveTo]);
  public positionEntities = this.w.newGroup([Position]);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    this.positionEntities.forEach((entity) => {
      if (!this.w.hasComponent(entity, PrevPosition)) return;

      this.w.removeComponent(entity, PrevPosition);
    });

    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const moveTo = this.w.getComponent(entity, MoveTo);
      const prevPosition = this.w.getComponent(entity, PrevPosition);

      vectorUtils.setVector(prevPosition, position);
      vectorUtils.setVector(position, moveTo);

      this._grid.moveEntity(entity, prevPosition, position);

      this.w.messageBroker
        .publish(RenderEvents.NEW_RENDER, entity)
        .publish(RenderEvents.CLEAN_RENDER, {
          x: prevPosition.x,
          y: prevPosition.y,
        });

      this.w.removeComponent(entity, MoveTo);
    });
  }
}
