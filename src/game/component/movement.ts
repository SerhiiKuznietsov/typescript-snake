import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Movement implements IComponent {
  public accumulatedTime: number = 0;

  constructor(public moveInterval: number = 100) {}
}

export const MovementPool = new ObjectPool(() => new Movement(), {
  initialize(item, params) {
    if (params?.accumulatedTime) {
      item.accumulatedTime = params.accumulatedTime;
    }

    if (params?.moveInterval) {
      item.moveInterval = params.moveInterval;
    }
  },
  deactivate(item) {
    item.accumulatedTime = 0;
    item.moveInterval = 100;
  },
  initialSize: 1,
});
