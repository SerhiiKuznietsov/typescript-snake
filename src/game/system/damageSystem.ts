import { Attack } from '../component/attack';
import { Damage } from '../component/damage';
import { TakeDamage } from '../component/takeDamage';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class DamageSystem implements ISystem {
  public entities: EntityId[] = [];
  public attackEntities: EntityId[] = [];

  constructor(public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [TakeDamage]);
    this.attackEntities = this.w.newGroup(this, [Attack, Damage]);
  }

  private clearDamageReceivedIfExists(entity: EntityId) {
    if (!this.w.hasComponent(entity, TakeDamage)) return;

    this.w.getComponent(entity, TakeDamage).damageReceived = 0;
  }

  public update(): void {
    this.entities.forEach((entity) => this.clearDamageReceivedIfExists(entity));

    this.attackEntities.forEach((e) => {
      const attack = this.w.getComponent(e, Attack);

      if (!attack.targets.length) return;

      const damage = this.w.getComponent(e, Damage);

      attack.targets.forEach((e) => {
        const takeDamage = this.w.getComponent(e, TakeDamage);

        takeDamage.damageReceived += damage.damage;
      });
    });
  }
}
