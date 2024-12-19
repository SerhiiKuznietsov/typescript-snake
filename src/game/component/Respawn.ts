import { IComponent } from '@/ecs/Component';

export class Respawn implements IComponent {
  constructor(public cooldown: number = 3000, public elapsed: number = 0) {}
}
