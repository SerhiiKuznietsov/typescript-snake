import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Food } from '../component/Food';
import { Snake } from '../component/Snake';
import { EntityId } from '@/ecs/Entity';
import { Poison } from '../component/Poison';
import { Death } from '../component/Death';
import { CollisionDetected } from '../component/CollisionDetected';

export class AttackSnakeSystem implements ISystem {
  public entities = this.w.newGroup([CollisionDetected, Snake]);

  constructor(public w: World) {}

  private attackFood(entity: EntityId) {
    const snake = this.w.getComponent(entity, Snake);
    snake.makeSegments += 1;
  }

  private attackPoison(entity: EntityId) {
    const snake = this.w.getComponent(entity, Snake);
    snake.makeSegments -= 1;
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const collision = this.w.getComponent(entity, CollisionDetected);

      collision.opponents.forEach((target) => {
        if (this.w.hasComponent(target, Food)) {
          this.attackFood(entity);
          this.w.getComponent(target, Death);
        }

        if (this.w.hasComponent(target, Poison)) {
          this.attackPoison(entity);
          this.w.getComponent(target, Death);
        }
      });
    });
  }
}
