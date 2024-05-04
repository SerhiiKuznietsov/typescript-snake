import { Attack } from '../component/attack';
import { Body } from '../component/body';
import { Health } from '../component/health';
import { Location } from '../component/location';
import { System } from './system';

export class CollisionSystem extends System {
  public update(): void {
    const collisionEntities = this._entities.filter(
      (e) =>
        e.hasComponent(Location) &&
        e.hasComponent(Health) &&
        e.getComponent(Health).isAlive
    );

    for (let i = 0; i < collisionEntities.length; i++) {
      for (let j = i + 1; j < collisionEntities.length; j++) {
        const entityA = collisionEntities[i];
        const entityB = collisionEntities[j];
        const locationA = entityA.getComponent(Location);
        const locationB = entityB.getComponent(Location);

        if (!locationA.position.isEqual(locationB.position)) continue;

        if (entityA.hasComponent(Attack)) {
          entityA.getComponent(Body).grow(locationA.position.copy());
          entityB.getComponent(Health).isAlive = false;
        }

        if (entityB.hasComponent(Attack)) {
          entityB.getComponent(Body).grow(locationB.position.copy());
          entityA.getComponent(Health).isAlive = false;
        }
      }
    }
  }
}
