import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class KeyboardInput implements IComponent {
  public up = false;
  public down = false;
  public left = false;
  public right = false;
}

export const KeyboardInputPool = new ObjectPool(() => new KeyboardInput(), {
  deactivate(item) {
    item.up = item.down = item.left = item.right = false;
  },
});
