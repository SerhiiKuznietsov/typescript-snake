import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Respawn implements IComponent {
  constructor(public cooldown: number = 3000, public elapsed: number = 0) {}
}

export const RespawnPool = new ObjectPool(() => new Respawn(), {
  initialize(item, params) {
    if (params?.cooldown) {
      item.cooldown = params.cooldown;
    }

    if (params?.elapsed) {
      item.elapsed = params.elapsed;
    }
  },
  deactivate(item) {
    item.cooldown = 3000;
    item.elapsed = 0;
  },
});
