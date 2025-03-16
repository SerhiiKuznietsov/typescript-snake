import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class MoveTo implements IComponent {
  constructor(public x: number = 0, public y: number = 0) {}
}

export const MoveToPool = new ObjectPool(() => new MoveTo(), {
  deactivate(item) {
    item.x = 0;
    item.y = 0;
  },
  initialSize: 1,
});
