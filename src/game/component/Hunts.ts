import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class Hunts implements IComponent {
  constructor(public target: EntityId | null = null) {}
}

export const HuntsPool = new ObjectPool(() => new Hunts(), {
  initialize(item, params) {
    if (params?.target) {
      item.target = params.target;
    }
  },
  deactivate(item) {
    item.target = null;
  },
});
