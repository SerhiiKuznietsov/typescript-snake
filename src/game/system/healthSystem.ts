import { Health } from '../component/health';
import { Location } from '../component/location';
import { Respawn } from '../component/respawn';
import { TakeDamage } from '../component/takeDamage';
import { Entity } from '../entity/entity';
import { range } from '../utils/random';
import { System } from './system';

export class HealthSystem extends System {
  private takeDamageIfExists(entity: Entity, health: Health) {
    if (!health.current || !entity.has(TakeDamage)) return;

    const takeDamage = entity.get(TakeDamage);

    if (!takeDamage.damageReceived) return;

    health.current -= takeDamage.damageReceived;
  }

  private respawnLocation(entities: Entity[]): { x: number; y: number } {
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
      if (!entity.has(Location)) return false;

      const location = entity.get(Location);

      return location.position.x === x && location.position.y === y;
    });
  }

  update(entities: Entity[]): void {
    this._entities.forEach((entity) => {
      const health = entity.get(Health);

      this.takeDamageIfExists(entity, health);

      if (!entity.has(Respawn) || !entity.get(Respawn).readyToRespawn) {
        return;
      }

      health.current = health.maxHealth;

      if (!entity.has(Location)) return;

      const location = entity.get(Location);

      const { x, y } = this.respawnLocation(entities);
      location.position.set(x, y);
    });
  }
}
