import { IComponent } from '@/ecs/component';

export class DebugFlag implements IComponent {
  constructor(readonly id: number) {}
}
