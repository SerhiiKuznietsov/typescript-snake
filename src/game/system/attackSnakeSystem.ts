import { CollisionOpponent } from '../component/CollisionOpponent';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Food } from '../component/Food';
import { Position } from '../component/Position';
import { createSnakeBody } from '../entities/snakeBody';
import { GameConfig } from '../config/game';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { Snake } from '../component/Snake';
import { EntityId } from '@/ecs/entity';
import { Poison } from '../component/Poison';

export class AttackSnakeSystem implements ISystem {
  public entities = this.w.newGroup(this, [CollisionOpponent, Snake]);

  constructor(public w: World, public config: GameConfig) {}

  private attackFood(entity: EntityId) {
    const snake = this.w.getComponent(entity, Snake);

    const spawnEntityPosition = snake.segments.at(-1) || entity;

    const newSnakeBody = createSnakeBody(this.w, this.config);

    snake.segments.push(newSnakeBody);

    vectorUtils.setVector(
      this.w.getComponent(newSnakeBody, Position),
      this.w.getComponent(spawnEntityPosition, Position)
    );
  }

  private attackPoison(entity: EntityId) {
    const { segments } = this.w.getComponent(entity, Snake);

    const lastSegment = segments.pop();

    if (!lastSegment) return;

    this.w.deleteEntity(lastSegment);
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const collision = this.w.getComponent(entity, CollisionOpponent);

      if (!collision.isActive) return;

      collision.entities.forEach((target) => {
        if (this.w.hasComponent(target, Food)) {
          this.attackFood(entity);
        }

        if (this.w.hasComponent(target, Poison)) {
          this.attackPoison(entity);
        }

        this.w.removeComponent(target, Position);
      });
    });
  }
}
