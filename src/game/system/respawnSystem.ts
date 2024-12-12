import { Respawn } from '../component/Respawn';
import { Position } from '../component/Position';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { RespawnReady } from '../component/RespawnReady';
import { Vector2 } from '../geometry/vector2';
import { range } from '../utils/random';
import { vectorUtils } from '../geometry/utils/vectorUtils';

export class RespawnSystem implements ISystem {
  public entities = this.w.newGroup([Respawn, RespawnReady]);
  public allEntities = this.w.newGroup([Position]);

  constructor(public w: World, private _bounds: Vector2) {}

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

      if (!this.isPositionOccupied(vector)) {
        return vector;
      }
      attempts++;
    }

    throw new Error('No free positions available');
  }

  private isPositionOccupied(vector: Vector2): boolean {
    return this.allEntities.some((entity) => {
      const position = this.w.getComponent(entity, Position);

      return vectorUtils.isEqual(position, vector);
    });
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const vector = this.getEmptyPosition();
      const position = this.w.getComponent(entity, Position);

      vectorUtils.setVector(position, vector);

      this.w.removeComponent(entity, RespawnReady);
    });
  }
}
