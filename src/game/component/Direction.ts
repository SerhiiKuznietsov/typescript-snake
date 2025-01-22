import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Direction implements IComponent {
  public changed = false;

  constructor(public x: number = 1, public y: number = 0) {}
}

export const DirectionPool = new ObjectPool(() => new Direction(), {
  initialize(item, params) {
    if (params?.x) {
      item.x = params.x;
    }

    if (params?.y) {
      item.y = params.y;
    }
  },
  deactivate(item) {
    item.x = 1;
    item.y = 0;
  },
  initialSize: 1,
});
