import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { PrevPosition } from '../component/PrevPosition';
import { Position } from '../component/Position';
import { Snake } from '../component/Snake';

export class SnakeMovementSystem implements ISystem {
  public entities = this.w.newGroup(this, [Snake, Position, PrevPosition]);

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const prevPosition = this.w.getComponent(entity, PrevPosition);
      const segments = this.w.getComponent(entity, Snake).segments;

      for (let i = segments.length - 1; i >= 0; i--) {
        const segmentId = segments[i];
        const nextSegmentId = segments[i - 1];

        const nextPosition = nextSegmentId
          ? this.w.getComponent(nextSegmentId, Position)
          : prevPosition;

        vectorUtils.setVector(
          this.w.getComponent(segmentId, Position),
          nextPosition
        );
      }
    });
  }
}
