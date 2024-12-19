import { IComponent } from '@/ecs/Component';

export class Movement implements IComponent {
  public accumulatedTime: number = 0;

  constructor(public moveInterval: number = 100) {}
}
