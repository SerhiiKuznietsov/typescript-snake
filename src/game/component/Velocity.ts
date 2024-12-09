import { IComponent } from '@/ecs/component';

export class Velocity implements IComponent {
  constructor(readonly id: number, public value = 1) {}
}
