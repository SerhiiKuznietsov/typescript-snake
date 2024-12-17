import { IComponent } from '@/ecs/Component';

export class Velocity implements IComponent {
  constructor(public value = 1) {}
}
