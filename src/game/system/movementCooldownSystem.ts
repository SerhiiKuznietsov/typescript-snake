import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class MovementCooldownSystem implements ISystem {
  public entities = this.w.newGroup(['Movement'], ['CanMove']);

  constructor(public w: World) {}

  public update({ deltaTime }: UpdateSystemData): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const movement = this.w.getComponent(entity, 'Movement');

      movement.accumulatedTime += deltaTime;
      if (movement.accumulatedTime < movement.moveInterval) continue;

      movement.accumulatedTime = 0;
      this.w.getComponent(entity, 'CanMove');
    }
  }
}
