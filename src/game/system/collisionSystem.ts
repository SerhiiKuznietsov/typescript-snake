import { CollisionOpponent } from '../component/collisionOpponent';
import { Health } from '../component/health';
import { Location } from '../component/location';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class CollisionSystem implements ISystem {
  public entities: EntityId[] = [];

  constructor(public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [
      Location,
      CollisionOpponent,
      Health,
    ]);
  }

  private clearCollisionOpponentIfExists(entity: EntityId) {
    if (!this.w.hasComponent(entity, CollisionOpponent)) return;

    const collisionOpponent = this.w.getComponent(entity, CollisionOpponent);

    collisionOpponent.entities = [];
    collisionOpponent.isActive = false;
  }

  private addToCollisionOpponentIfExists(entityA: EntityId, entityB: EntityId) {
    if (!this.w.hasComponent(entityA, CollisionOpponent)) return;

    const collisionOpponent = this.w.getComponent(entityA, CollisionOpponent);

    collisionOpponent.entities.push(entityB);
    collisionOpponent.isActive = true;
  }

  public update(): void {
    this.entities.forEach((entity) => {
      this.clearCollisionOpponentIfExists(entity);
    });

    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const entityA = this.entities[i];
        const entityB = this.entities[j];

        const locationA = this.w.getComponent(entityA, Location);
        const locationB = this.w.getComponent(entityB, Location);

        if (!locationA.position.isEqual(locationB.position)) continue;

        this.addToCollisionOpponentIfExists(entityA, entityB);
        this.addToCollisionOpponentIfExists(entityB, entityA);
      }
    }
  }
}
