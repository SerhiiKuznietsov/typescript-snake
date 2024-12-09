import { World } from '@/ecs/World';
import { Health } from '../component/health';
import { Respawn } from '../component/respawn';
import { TakeDamage } from '../component/takeDamage';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { Location } from '../component/location';

export class HealthSystem implements ISystem {
  public entities: EntityId[] = [];

  constructor(public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [Health]);
  }

  private takeDamageIfExists(entity: EntityId, health: Health) {
    if (!health.current || !this.w.hasComponent(entity, TakeDamage)) return;

    const takeDamage = this.w.getComponent(entity, TakeDamage);

    if (!takeDamage.damageReceived) return;

    health.current -= takeDamage.damageReceived;

    if (health.current) return;

    this.w.removeComponent(entity, Location);
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const health = this.w.getComponent(entity, Health);

      this.takeDamageIfExists(entity, health);

      if (
        !this.w.hasComponent(entity, Respawn) ||
        !this.w.getComponent(entity, Respawn).readyToRespawn
      )
        return;

      health.current = health.maxHealth;
    });
  }
}
