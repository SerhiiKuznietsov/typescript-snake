import { IComponent } from '../../ecs/Component';
import { EntityId } from '@/ecs/Entity';

export class CollisionDetected implements IComponent {
  public opponents: EntityId[] = [];
}
