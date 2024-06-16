import { Attack } from '../component/attack';
import { Damage } from '../component/damage';
import { TakeDamage } from '../component/takeDamage';
import { Entity } from '../../ecs/entity';
import { ISystem, UpdateSystemData } from '../../ecs/system';

export class DamageSystem implements ISystem {
  public readonly requiredComponents = [TakeDamage];
  public entities: Entity[] = [];

  private clearDamageReceivedIfExists(entity: Entity) {
    if (!entity.has(TakeDamage)) return;

    entity.get(TakeDamage).damageReceived = 0;
  }

  public update({ entities }: UpdateSystemData): void {
    this.entities.forEach((entity) => this.clearDamageReceivedIfExists(entity));

    entities.forEach((e) => {
      if (!e.has(Attack) || !e.has(Damage)) return;
      const attack = e.get(Attack);

      if (!attack.targets.length) return;

      const damage = e.get(Damage);

      attack.targets.forEach((e) => {
        const takeDamage = e.get(TakeDamage);

        takeDamage.damageReceived += damage.damage;
      });
    });
  }
}
