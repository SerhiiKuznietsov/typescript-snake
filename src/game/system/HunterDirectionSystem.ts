import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { RenderEvents } from './events/render';

export class HunterDirectionSystem implements ISystem {
  public entities = this.w.newGroup(['Hunter', 'Position', 'Direction']);

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entityId) => {
      const hunterPosition = this.w.getComponent(entityId, 'Position');
      const direction = this.w.getComponent(entityId, 'Direction');

      if (this.w.hasComponent(entityId, 'Target')) {
        const target = this.w.getComponent(entityId, 'Target');

        if (
          target.targetId &&
          !this.w.hasComponent(target.targetId, 'Position')
        ) {
          this.w.removeComponent(entityId, 'Target');
        }

        if (target.targetId) {
          const targetPosition = this.w.getComponent(
            target.targetId,
            'Position'
          );
          const dir = vectorUtils.direction(hunterPosition, targetPosition);

          vectorUtils.setVector(direction, dir);

          this.w.messageBroker.publish(RenderEvents.NEW_RENDER, entityId);
        } else {
          direction.x = 1;
          direction.y = 0;
        }
      } else {
        direction.x = 1;
        direction.y = 0;
      }
    });
  }
}
