import { Attack } from '../component/attack';
import { CollisionOpponent } from '../component/collisionOpponent';
import { Health } from '../component/health';
import { Entity } from '../../ecs/entity';
import { ISystem } from '../../ecs/system';

export class AttackSystem implements ISystem {
  public readonly requiredComponents = [Attack, CollisionOpponent, Health];
  public entities: Entity[] = [];

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
    this.entities.forEach((entity) => {
      if (!entity.get(Health).current) return;

      const attack = entity.get(Attack);
      const collisionOpponent = entity.get(CollisionOpponent);

      this.clearAttackTargets(attack);
      this.setAttackTargets(attack, collisionOpponent);
    });
  }
}
