import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Respawn implements IComponent {
  constructor(public cooldown: number = 3000) {}
}

export const RespawnPool = new ObjectPool(() => new Respawn(), {
  deactivate(item) {
    item.cooldown = 0;
  },
});
