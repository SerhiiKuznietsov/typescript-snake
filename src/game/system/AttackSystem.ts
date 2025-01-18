import { ISystem } from '@/ecs/SystemRegistry';
import { EntityId } from '@/ecs/Entity';
import { World } from '@/ecs/World';

export class AttackSystem implements ISystem {
  public entities = this.w.newGroup(['Attacker', 'CollisionDetected']);

  constructor(public w: World) {}

  private attackFood(entity: EntityId) {
    if (!this.w.hasComponent(entity, 'Snake')) return;

    const snake = this.w.getComponent(entity, 'Snake');
    snake.makeSegments += 1;
  }

  private attackPoison(entity: EntityId) {
    if (!this.w.hasComponent(entity, 'Snake')) return;

    const snake = this.w.getComponent(entity, 'Snake');
    snake.makeSegments -= 1;
  }

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const { target } = this.w.getComponent(entity, 'CollisionDetected');

      if (this.w.hasComponent(target, 'Food')) {
        this.attackFood(entity);
        this.w.getComponent(target, 'Death');
      } else if (this.w.hasComponent(target, 'Poison')) {
        this.attackPoison(entity);
        this.w.getComponent(target, 'Death');
      }

      if (this.w.hasComponent(target, 'Hunter') && this.w.hasComponent(target, 'Target')) {
        this.w.removeComponent(entity, 'Target');
      }
    }
  }
}
