import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { RenderEvents } from './events/render';

export class HunterDirectionSystem implements ISystem {
  public entities = this.w.newGroup(['Hunter', 'Position', 'Direction']);

  constructor(public w: World) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const hunterPosition = this.w.getComponent(entity, 'Position');
      const direction = this.w.getComponent(entity, 'Direction');

      if (this.w.hasComponent(entity, 'Target')) {
        const target = this.w.getComponent(entity, 'Target');

        if (
          target.targetId &&
          !this.w.hasComponent(target.targetId, 'Position')
        ) {
          this.w.removeComponent(entity, 'Target');
        }

        if (target.targetId) {
          const targetPosition = this.w.getComponent(
            target.targetId,
            'Position'
          );
          const dir = vectorUtils.direction(hunterPosition, targetPosition);

          vectorUtils.setVector(direction, dir);

          this.w.messageBroker.publish(RenderEvents.NEW_RENDER, entity);
        } else {
          direction.x = 1;
          direction.y = 0;
        }
      } else {
        direction.x = 1;
        direction.y = 0;
      }
    }
  }
}
