import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class DebugFlag implements IComponent {
  constructor(public isOpen: boolean = false) {}
}

export const DebugFlagPool = new ObjectPool(() => new DebugFlag(), {
  initialize(item, params) {
    if (params?.isOpen) {
      item.isOpen = params.isOpen;
    }
  },
  deactivate(item) {
    item.isOpen = false;
  },
});
