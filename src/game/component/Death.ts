import { IComponent } from '@/ecs/Component';

export class Death implements IComponent {
  constructor(readonly id: number) {}
}
