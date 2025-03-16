import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class SnakeBody implements IComponent {
  public declare head: EntityId;
  public declare next: EntityId | null;
  public declare prev: EntityId | null;
}

export const SnakeBodyPool = new ObjectPool(() => new SnakeBody(), {
  deactivate(item) {
    item.prev = null;
  },
});
