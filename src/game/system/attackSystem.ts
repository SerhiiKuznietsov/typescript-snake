import { Attack } from '../component/attack';
import { CollisionOpponent } from '../component/collisionOpponent';
import { Health } from '../component/health';
import { EntityId } from '@/ecs/entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class AttackSystem implements ISystem {
  public readonly requiredComponents = [Attack, CollisionOpponent, Health];

  public entities: EntityId[] = [];

  constructor(public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [Attack, CollisionOpponent, Health]);
  }

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
      if (!this.w.getComponent(entity, Health).current) return;

      const attack = this.w.getComponent(entity, Attack);
      const collisionOpponent = this.w.getComponent(entity, CollisionOpponent);

      this.clearAttackTargets(attack);
      this.setAttackTargets(attack, collisionOpponent);
    });
  }
}
