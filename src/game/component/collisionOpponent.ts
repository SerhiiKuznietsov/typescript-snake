import { IComponent } from '@/ecs/component';
import { EntityId } from '@/ecs/entity';

export class CollisionOpponent implements IComponent {
  public entities: EntityId[] = [];
  public isActive = false;

  constructor(readonly id: number) {}
}
