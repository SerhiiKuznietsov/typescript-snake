import { Attack } from '../component/attack';
import { Body } from '../component/body';
import { CollisionOpponent } from '../component/collisionOpponent';
import { Health } from '../component/health';
import { Location } from '../component/location';
import { TakeDamage } from '../component/takeDamage';
import { Entity } from '../entity/entity';
import { System } from './system';

export class AttackSystem extends System {
  private clearDamageReceivedIfExists(entity: Entity) {
    if (!entity.has(TakeDamage)) return;

    entity.get(TakeDamage).damageReceived = 0;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      this.clearDamageReceivedIfExists(entity);
    });

    this._entities.forEach((entity) => {
      if (
        !entity.has(Attack) ||
        !entity.has(CollisionOpponent) ||
        !entity.get(CollisionOpponent).isActive ||
        !entity.has(Health) ||
        !entity.get(Health).current
      ) {
        return;
      }

      const collisionOpponent = entity.get(CollisionOpponent);
      const attack = entity.get(Attack);

      collisionOpponent.entities.forEach((e) => {
        e.get(TakeDamage).damageReceived = attack.damage;
      });

      if (!entity.has(Body)) return;

      entity.get(Body).grow(entity.get(Location).position.copy());
    });
  }
}
