import { IComponent } from '@/ecs/Component';

export class CanMove implements IComponent {
  constructor(readonly id: number) {}
}
