import { IComponent } from '@/ecs/Component';

export class PlayerInput implements IComponent {
  constructor(readonly id: number) {}
}
