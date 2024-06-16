import { IComponent } from '../../ecs/component';

export class TakeDamage implements IComponent {
  constructor(readonly id: number, public damageReceived: number = 0) {}
}
