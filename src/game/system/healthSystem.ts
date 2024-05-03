import { Health } from '../component/health';
import { Location } from '../component/location';
import { Entity } from '../entity/entity';
import { range } from '../utils/random';
import { System } from './system';

export class HealthSystem extends System {
  public update(): void {
    this._entities.forEach((entity) => {
      const health = entity.getComponent(Health);

      if (health.isAlive) return;

      this.handleRespawn(entity, health);
    });
  }

  public handleRespawn(entity: Entity, health: Health): void {
    health.respawn();
    const location = entity.getComponent(Location);

    if (!location) return;

    location.position.set(range(0, 19), range(0, 19));
  }
}
