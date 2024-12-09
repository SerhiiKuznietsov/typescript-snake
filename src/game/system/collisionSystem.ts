import { CollisionOpponent } from '../component/CollisionOpponent';
import { Position } from '../component/Position';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Collider } from '../component/Collider';

export class CollisionSystem implements ISystem {
  public entities = this.w.newGroup(this, [Position, Collider]);
  public collisionEntities = this.w.newGroup(this, [
    Position,
    Collider,
    CollisionOpponent,
  ]);

  constructor(public w: World) {}

  private clearCollisionOpponentIfExists() {
    this.collisionEntities.forEach((entity) => {
      const collisionOpponent = this.w.getComponent(entity, CollisionOpponent);

      collisionOpponent.entities = [];
      collisionOpponent.isActive = false;
    });
  }

  private addToCollisionOpponentIfExists(entityA: EntityId, entityB: EntityId) {
    if (!this.w.hasComponent(entityA, CollisionOpponent)) return;

    const collisionOpponent = this.w.getComponent(entityA, CollisionOpponent);

    collisionOpponent.entities.push(entityB);
    collisionOpponent.isActive = true;
  }

  public update(): void {
    this.clearCollisionOpponentIfExists();

    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const entityA = this.entities[i];
        const entityB = this.entities[j];

        const locationA = this.w.getComponent(entityA, Position);
        const locationB = this.w.getComponent(entityB, Position);

        if (!locationA.position.isEqual(locationB.position)) continue;

        this.addToCollisionOpponentIfExists(entityA, entityB);
        this.addToCollisionOpponentIfExists(entityB, entityA);
      }
    }
  }
}
