import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Vector2 } from '../geometry/vector2';
import { range } from '../utils/random';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';
import { RenderEvents } from './events/render';

export class RespawnSystem implements ISystem {
  public entities = this.w.newGroup(['Respawn', 'RespawnReady']);

  constructor(
    public w: World,
    private _grid: GridManager,
    private _bounds: Vector2
  ) {}

  private getRandomVector(): Vector2 {
    return {
      x: range(0, this._bounds.x),
      y: range(0, this._bounds.y),
    };
  }

  private getEmptyPosition(): Vector2 {
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      const vector = this.getRandomVector();

      if (!this._grid.getEntitiesInCell(vector.x, vector.y).length) {
        return vector;
      }
      attempts++;
    }

    throw new Error('No free positions available');
  }

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      const emptyPosition = this.getEmptyPosition();
      const position = this.w.getComponent(entity, 'Position');

      vectorUtils.setVector(position, emptyPosition);

      this._grid.addEntity(entity, position);
      this.w.messageBroker.publish(RenderEvents.NEW_RENDER, entity);

      this.w.removeComponent(entity, 'RespawnReady');
    }
  }
}
