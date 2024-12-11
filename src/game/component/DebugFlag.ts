import { IComponent } from '@/ecs/Component';

export class DebugFlag implements IComponent {
  constructor(readonly id: number) {}
}
