import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class RespawnPosition implements IComponent {
  constructor(public x: number = 0, public y: number = 0) {}
}

export const RespawnPositionPool = new ObjectPool(() => new RespawnPosition(), {
  initialize(item, params) {
    if (params?.x) {
      item.x = params.x;
    }

    if (params?.y) {
      item.y = params.y;
    }
  },
  deactivate(item) {
    item.x = item.y = 0;
  },
  initialSize: 10,
});
