import { IComponent } from '@/ecs/Component';

export class Direction implements IComponent {
  public changed = false;

  constructor(
    readonly id: number,
    public x: number = 1,
    public y: number = 0
  ) {}
}
