import { IComponent } from '@/ecs/Component';
import { EntityId } from '@/ecs/Entity';

export class CollisionOpponent implements IComponent {
  public entities: EntityId[] = [];
  public isActive = false;

  constructor(readonly id: number) {}
}
