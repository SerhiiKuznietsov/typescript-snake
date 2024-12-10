import { IComponent } from '@/ecs/component';

export class Respawn implements IComponent {
  constructor(
    readonly id: number,
    public cooldown: number = 3,
    public elapsed: number = 0
  ) {}
}
