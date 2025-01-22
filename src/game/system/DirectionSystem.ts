import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';

export class DirectionSystem implements ISystem {
  public entities = this.w.newGroup(['PlayerInput', 'Direction', 'CanMove']);

  constructor(public w: World) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const input = this.w.getComponent(entity, 'PlayerInput');
      const direction = this.w.getComponent(entity, 'Direction');

      if (input.up && direction.y !== 1) {
        vectorUtils.set(direction, 0, -1);
        continue;
      }

      if (input.right && direction.x !== -1) {
        vectorUtils.set(direction, 1, 0);
        continue;
      }

      if (input.down && direction.y !== -1) {
        vectorUtils.set(direction, 0, 1);
        continue;
      }

      if (input.left && direction.x !== 1) {
        vectorUtils.set(direction, -1, 0);
        continue;
      }
    }
  }

}
