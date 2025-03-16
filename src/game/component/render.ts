import { IComponent } from '@/ecs/Component';
import { ObjectPool } from '../../ecs/ObjectPool';

export class Render implements IComponent {
  constructor(public color: string = '#000', public size: number = 20) {}
}

export const RenderPool = new ObjectPool(() => new Render(), {
  deactivate(item) {
    item.color = '#000';
    item.size = 20;
  },
});
