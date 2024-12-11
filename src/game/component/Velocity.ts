import { IComponent } from '@/ecs/Component';

export class Velocity implements IComponent {
  constructor(readonly id: number, public value = 1) {}
}
