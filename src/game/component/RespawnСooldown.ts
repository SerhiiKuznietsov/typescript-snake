import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class RespawnСooldown implements IComponent {
  constructor(public remainingTime: number = 0) {}
}

export const RespawnСooldownPool = new ObjectPool(() => new RespawnСooldown(), {
  initialize(item, params) {
    if (params?.remainingTime) {
      item.remainingTime = params.remainingTime;
    }
  },
  deactivate(item) {
    item.remainingTime = 0;
  },
});
