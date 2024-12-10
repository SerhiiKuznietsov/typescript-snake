import { CollisionOpponent } from '../component/CollisionOpponent';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Food } from '../component/Food';

export class AttackFoodSystem implements ISystem {
  public entities = this.w.newGroup(this, [CollisionOpponent]);

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const collision = this.w.getComponent(entity, CollisionOpponent);

      if (!collision.isActive) return;

      collision.entities.forEach((target) => {
        if (!this.w.hasComponent(target, Food)) return;

        this.w.deleteEntity(target);
      });
    });
  }
}
