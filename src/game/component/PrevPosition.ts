import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class PrevPosition implements IComponent {
  constructor(public x: number = 0, public y: number = 0) {}
}

export const PrevPositionPool = new ObjectPool(() => new PrevPosition(), {
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
