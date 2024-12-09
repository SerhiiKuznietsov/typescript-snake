import { IComponent } from '@/ecs/component';

export class Health implements IComponent {
  constructor(
    readonly id: number,
    public maxHealth: number = 1,
    public current: number = maxHealth
  ) {}
}
