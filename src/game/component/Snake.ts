import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class Snake implements IComponent {
  public segments: number = 0;
  public tail: EntityId | null = null;

  constructor(public makeSegments: number = 0) {}
}

export const SnakePool = new ObjectPool(() => new Snake(), {
  deactivate(item) {
    item.makeSegments = 0;
    item.segments = 0;
  },
});
