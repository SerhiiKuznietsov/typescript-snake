import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Collider implements IComponent {
  constructor(public width: number = 0, public height: number = 0) {}
}

export const ColliderPool = new ObjectPool(() => new Collider(), {
  initialize(item, params) {
    if (params?.width) {
      item.width = params.width;
    }

    if (params?.height) {
      item.height = params.height;
    }
  },
  deactivate(item) {
    item.width = 0;
    item.height = 0;
  },
  initialSize: 20,
});
