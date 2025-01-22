import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class Snake implements IComponent {
  public segments: EntityId[] = [];

  constructor(public makeSegments: number = 0) {}
}

export const SnakePool = new ObjectPool(() => new Snake(), {
  initialize(item, params) {
    if (params?.makeSegments) {
      item.makeSegments = params.makeSegments;
    }

    if (params?.segments?.length) {
      item.segments.push(...params.segments);
    }
  },
  deactivate(item) {
    item.makeSegments = 0;
    item.segments.length = 0;
  },
});
