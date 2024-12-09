import { IComponent } from '@/ecs/component';

export class PlayerInput implements IComponent {
  constructor(readonly id: number) {}
}
