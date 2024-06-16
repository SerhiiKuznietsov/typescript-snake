import { IComponent } from '../../ecs/component';
import { Entity } from '../../ecs/entity';

export class Attack implements IComponent {
  constructor(readonly id: number, public targets: Entity[] = []) {}
}
