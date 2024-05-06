import { CollisionOpponent } from '../component/collisionOpponent';
import { Health } from '../component/health';
import { Location } from '../component/location';
import { Entity } from '../entity/entity';
import { System } from './system';

export class CollisionSystem extends System {
  public requiredComponents = [Location];

  private clearCollisionOpponentIfExists(entity: Entity) {
    if (!entity.has(CollisionOpponent)) return;

    const collisionOpponent = entity.get(CollisionOpponent);

    collisionOpponent.entities = [];
    collisionOpponent.isActive = false;
  }

  private addToCollisionOpponentIfExists(entityA: Entity, entityB: Entity) {
    if (!entityA.has(CollisionOpponent)) return;

    const collisionOpponent = entityA.get(CollisionOpponent);

    collisionOpponent.entities.push(entityB);
    collisionOpponent.isActive = true;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      if (!entity.has(Location)) return;

      this.clearCollisionOpponentIfExists(entity);
    });

    const collisionEntities = this._entities.filter(
      (e) => e.has(Location) && e.has(Health) && e.get(Health).current
    );

    for (let i = 0; i < collisionEntities.length; i++) {
      for (let j = i + 1; j < collisionEntities.length; j++) {
        const entityA = collisionEntities[i];
        const entityB = collisionEntities[j];

        const locationA = entityA.get(Location);
        const locationB = entityB.get(Location);

        if (!locationA.position.isEqual(locationB.position)) continue;

        this.addToCollisionOpponentIfExists(entityA, entityB);
        this.addToCollisionOpponentIfExists(entityB, entityA);
      }
    }
  }
}
