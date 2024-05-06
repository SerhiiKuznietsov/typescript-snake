import { Attack } from '../component/attack';
import { Damage } from '../component/damage';
import { Location } from '../component/location';
import { TakeDamage } from '../component/takeDamage';
import { Entity } from '../entity/entity';
import { UpdateSystemData } from '../manager/type';
import { System } from './system';

export class DamageSystem extends System {
  public requiredComponents = [TakeDamage];

  private clearDamageReceivedIfExists(entity: Entity) {
    if (!entity.has(TakeDamage)) return;

    entity.get(TakeDamage).damageReceived = 0;
  }

  public update({ entities }: UpdateSystemData): void {
    this._entities.forEach((entity) =>
      this.clearDamageReceivedIfExists(entity)
    );

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
