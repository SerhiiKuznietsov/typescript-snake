import { IComponent } from '@/ecs/Component';

export class PlayerInput implements IComponent {
  public up = false;
  public down = false;
  public left = false;
  public right = false;
}
