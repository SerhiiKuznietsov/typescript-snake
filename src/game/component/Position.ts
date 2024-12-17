import { IComponent } from '@/ecs/Component';

export class Position implements IComponent {
  constructor(public x: number = 0, public y: number = 0) {}
}
