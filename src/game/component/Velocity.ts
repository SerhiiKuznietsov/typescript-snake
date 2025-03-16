import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Velocity implements IComponent {
  constructor(public value = 1) {}
}

export const VelocityPool = new ObjectPool(() => new Velocity(), {
  deactivate(item) {
    item.value = 1;
  },
});
