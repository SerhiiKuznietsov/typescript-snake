import { Attack } from '../component/attack';
import { CollisionOpponent } from '../component/collisionOpponent';
import { Health } from '../component/health';
import { System } from './system';

export class AttackSystem extends System {
  public requiredComponents = [Attack, CollisionOpponent, Health];

  private clearAttackTargets(attack: Attack) {
    attack.targets = [];
  }

  private setAttackTargets(
    attack: Attack,
    collisionOpponent: CollisionOpponent
  ) {
    if (!collisionOpponent.isActive) return;

    collisionOpponent.entities.forEach((e) => {
      attack.targets.push(e);
    });
  }

  public update(): void {
    this._entities.forEach((entity) => {
      if (!entity.get(Health).current) return;

      const attack = entity.get(Attack);
      const collisionOpponent = entity.get(CollisionOpponent);

      this.clearAttackTargets(attack);
      this.setAttackTargets(attack, collisionOpponent);
    });
  }
}
