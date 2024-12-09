import { IComponent } from '@/ecs/component';

export class Movement implements IComponent {
  public accumulatedTime: number = 0;
  public moveInterval: number;

  constructor(readonly id: number, moveInterval: number = 0.8) {
    this.moveInterval = moveInterval * 100;
  }
}
