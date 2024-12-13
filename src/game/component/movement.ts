import { IComponent } from '@/ecs/Component';

export class Movement implements IComponent {
  public accumulatedTime: number = 0;
  public moveInterval: number;

  constructor(moveInterval: number = 0.8) {
    this.moveInterval = moveInterval * 100;
  }
}
