import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Food } from '../component/Food';
import { Poison } from '../component/Poison';
import { Death } from '../component/Death';
import { CollisionDetected } from '../component/CollisionDetected';
import { Hunter } from '../component/Hunter';

export class HunterAttackSystem implements ISystem {
  public entities = this.w.newGroup([CollisionDetected, Hunter]);

  constructor(public w: World) {}

  public update(): void {
    this.entities.forEach((entity) => {
      const collision = this.w.getComponent(entity, CollisionDetected);

      collision.opponents.forEach((target) => {
        // if (this.w.getComponent(target, Death)) return;

        if (this.w.hasComponent(target, Food)) {
          this.w.getComponent(target, Death);
        }

        if (this.w.hasComponent(target, Poison)) {
          this.w.getComponent(target, Death);
        }
      });
    });
  }
}
