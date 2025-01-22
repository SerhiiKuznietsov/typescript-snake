import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class PlayerInput implements IComponent {
  public up = false;
  public down = false;
  public left = false;
  public right = false;
}

export const PlayerInputPool = new ObjectPool(() => new PlayerInput(), {
  initialize(item, params) {
    if (params?.up) {
      item.up = params.up;
    }

    if (params?.down) {
      item.down = params.down;
    }

    if (params?.left) {
      item.left = params.left;
    }

    if (params?.right) {
      item.right = params.right;
    }
  },
  deactivate(item) {
    item.up = item.down = item.left = item.right = false;
  },
});
