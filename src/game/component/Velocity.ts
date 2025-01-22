import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Velocity implements IComponent {
  constructor(public value = 1) {}
}

export const VelocityPool = new ObjectPool(() => new Velocity(), {
  initialize(item, params) {
    if (params?.value) {
      item.value = params.value;
    }
  },
  deactivate(item) {
    item.value = 1;
  },
});
