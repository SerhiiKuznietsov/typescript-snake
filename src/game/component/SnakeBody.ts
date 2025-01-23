import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class SnakeBody implements IComponent {
  public declare head: EntityId;
  public declare next: EntityId | null;
  public declare prev: EntityId | null;
}

export const SnakeBodyPool = new ObjectPool(() => new SnakeBody(), {
  initialize(item, params) {
    if (params?.head) {
      item.head = params.head;
    } else {
      throw new Error(`"head" mandatory parameter`);
    }

    if (params?.next) {
      item.next = params.next;
    }

    if (params?.prev) {
      item.prev = params.prev;
    }
  },
  deactivate(item) {
    item.prev = null;
  },
});
