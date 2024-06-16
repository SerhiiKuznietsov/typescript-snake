import { IComponent } from '../../ecs/component';
import { Entity } from '../../ecs/entity';

export class CollisionOpponent implements IComponent {
  public entities: Entity[] = [];
  public isActive = false;

  constructor(readonly id: number) {}
}
