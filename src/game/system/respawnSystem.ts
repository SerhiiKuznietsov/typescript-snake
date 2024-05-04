import { Health } from '../component/health';
import { Location } from '../component/location';
import { Respawn } from '../component/respawn';
import { Entity } from '../entity/entity';
import { range } from '../utils/random';

export class RespawnSystem {
  update(entities: Entity[], deltaTime: number): void {
    entities.forEach((entity) => {
      if (
        !entity.hasComponent(Health) ||
        !entity.hasComponent(Respawn) ||
        !entity.hasComponent(Location)
      )
        return;

      const health = entity.getComponent(Health);
      const respawn = entity.getComponent(Respawn);
      const location = entity.getComponent(Location);

      if (!health.isAlive && !respawn.processing) {
        respawn.processing = true;
        respawn.remainingTime = respawn.respawnTime;
      }

      if (!respawn.processing) return;

      respawn.remainingTime -= deltaTime;

      if (respawn.remainingTime > 0) return;

      health.isAlive = true;
      const { x, y } = this.respawnLocation(entity, entities);
      location.position.set(x, y);

      respawn.processing = false;
    });
  }

  private respawnLocation(
    entity: Entity,
    entities: Entity[]
  ): { x: number; y: number } {
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      const x = range(0, 19);
      const y = range(0, 19);

      if (!this.isPositionOccupied(x, y, entities)) {
        return { x, y };
      }
      attempts++;
    }

    throw new Error('No free positions available');
  }

  private isPositionOccupied(
    x: number,
    y: number,
    entities: Entity[]
  ): boolean {
    return entities.some((entity) => {
      if (!entity.getComponent(Location)) return false;

      const location = entity.getComponent(Location);

      return location.position.x === x && location.position.y === y;
    });
  }
}
