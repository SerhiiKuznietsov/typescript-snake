import { IComponent } from '@/ecs/component';

export class Collider implements IComponent {
  constructor(
    readonly id: number,
    public width: number,
    public height: number
  ) {}
}
