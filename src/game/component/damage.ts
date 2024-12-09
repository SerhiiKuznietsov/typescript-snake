import { IComponent } from '@/ecs/component';

export class Damage implements IComponent {
  constructor(readonly id: number, public damage: number = 0) {}
}
