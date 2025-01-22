import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';
import { EntityId } from '@/ecs/Entity';

export class Target implements IComponent {
  constructor(public targetId: EntityId | null = null) {}
}

export const TargetPool = new ObjectPool(() => new Target(), {
  initialize(item, params) {
    if (params?.targetId) {
      item.targetId = params.targetId;
    }
  },
  deactivate(item) {
    item.targetId = null;
  },
});
