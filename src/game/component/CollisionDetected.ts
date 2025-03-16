import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class CollisionDetected implements IComponent {
  public target: EntityId = 0;
}

export const CollisionDetectedPool = new ObjectPool(
  () => new CollisionDetected(),
  {
    deactivate: (item) => {
      item.target = 0;
    },
    initialSize: 2,
  }
);
