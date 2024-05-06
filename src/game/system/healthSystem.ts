import { Health } from '../component/health';
import { Respawn } from '../component/respawn';
import { TakeDamage } from '../component/takeDamage';
import { Entity } from '../entity/entity';
import { System } from './system';

export class HealthSystem extends System {
  public requiredComponents = [Health];

  private takeDamageIfExists(entity: Entity, health: Health) {
    if (!health.current || !entity.has(TakeDamage)) return;

    const takeDamage = entity.get(TakeDamage);

    if (!takeDamage.damageReceived) return;

    health.current -= takeDamage.damageReceived;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      const health = entity.get(Health);

      this.takeDamageIfExists(entity, health);

      if (!entity.has(Respawn) || !entity.get(Respawn).readyToRespawn) return;

      health.current = health.maxHealth;
    });
  }
}
