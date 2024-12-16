import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { PrevPosition } from '../component/PrevPosition';
import { Position } from '../component/Position';
import { Snake } from '../component/Snake';
import { RenderEvents } from './events/render';

export class SnakeMovementSystem implements ISystem {
  public entities = this.w.newGroup([Snake, Position, PrevPosition]);

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const prevPosition = this.w.getComponent(entity, PrevPosition);
      const segments = this.w.getComponent(entity, Snake).segments;

      const lastSegment = segments.at(-1);

      if (lastSegment) {
        const { x, y } = this.w.getComponent(lastSegment, Position);

        this.w.messageBroker.publish(RenderEvents.CLEAN_RENDER, { x, y });
      }

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

      const firstSegment = segments.at(0);

      if (firstSegment) {
        this.w.messageBroker.publish(RenderEvents.NEW_RENDER, firstSegment);
      }
    });
  }
}
