import { IComponent } from '@/ecs/Component';

export class Respawn implements IComponent {
  constructor(public cooldown: number = 3, public elapsed: number = 0) {}
}
