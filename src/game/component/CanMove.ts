import { IComponent } from '@/ecs/component';

export class CanMove implements IComponent {
  constructor(readonly id: number) {}
}
