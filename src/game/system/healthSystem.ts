import { Health } from '../component/health';
import { Respawn } from '../component/respawn';
import { TakeDamage } from '../component/takeDamage';
import { Entity } from '../../ecs/entity';
import { ISystem } from '../../ecs/system';

export class HealthSystem implements ISystem {
  public readonly requiredComponents = [Health];
  public entities: Entity[] = [];

  private takeDamageIfExists(entity: Entity, health: Health) {
    if (!health.current || !entity.has(TakeDamage)) return;

    const takeDamage = entity.get(TakeDamage);

    if (!takeDamage.damageReceived) return;

    health.current -= takeDamage.damageReceived;
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const health = entity.get(Health);

      this.takeDamageIfExists(entity, health);

      if (!entity.has(Respawn) || !entity.get(Respawn).readyToRespawn) return;

      health.current = health.maxHealth;
    });
  }
}
