import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Position implements IComponent {
  constructor(public x: number = 0, public y: number = 0) {}
}

export const PositionPool = new ObjectPool(() => new Position(), {
  initialize(item, params) {
    if (params?.x) {
      item.x = params.x;
    }

    if (params?.y) {
      item.y = params.y;
    }
  },
  deactivate(item) {
    item.x = 0;
    item.y = 0;
  },
  initialSize: 10,
});
