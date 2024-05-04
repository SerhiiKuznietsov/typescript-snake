import { Attack } from '../component/attack';
import { Body } from '../component/body';
import { Health } from '../component/health';
import { Location } from '../component/location';
import { System } from './system';

export class CollisionSystem extends System {
  public update(): void {
    const collisionEntities = this._entities.filter(
      (e) => e.has(Location) && e.has(Health) && e.get(Health).isAlive
    );

    for (let i = 0; i < collisionEntities.length; i++) {
      for (let j = i + 1; j < collisionEntities.length; j++) {
        const entityA = collisionEntities[i];
        const entityB = collisionEntities[j];

        const locationA = entityA.get(Location);
        const locationB = entityB.get(Location);

        if (!locationA.position.isEqual(locationB.position)) continue;

        if (entityA.has(Attack)) {
          entityA.get(Body).grow(locationA.position.copy());
          entityB.get(Health).isAlive = false;
        }

        if (entityB.has(Attack)) {
          entityB.get(Body).grow(locationB.position.copy());
          entityA.get(Health).isAlive = false;
        }
      }
    }
  }
}
