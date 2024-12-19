import { Movement } from '../component/Movement';
import { CanMove } from '../component/CanMove';
import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class MovementCooldownSystem implements ISystem {
  public entities = this.w.newGroup([Movement]);

  constructor(public w: World) {}

  public update({ deltaTime }: UpdateSystemData): void {
    this.entities.forEach((entity) => {
      const movement = this.w.getComponent(entity, Movement);

      movement.accumulatedTime += deltaTime;

      if (movement.accumulatedTime < movement.moveInterval) return;

      movement.accumulatedTime = 0;

      this.w.getComponent(entity, CanMove);
    });
  }
}
