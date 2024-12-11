import { IComponent } from '@/ecs/Component';

export class Collider implements IComponent {
  constructor(
    readonly id: number,
    public width: number = 0,
    public height: number = 0
  ) {}
}
