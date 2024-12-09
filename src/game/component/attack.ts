import { IComponent } from '@/ecs/component';
import { EntityId } from '@/ecs/entity';

export class Attack implements IComponent {
  constructor(readonly id: number, public targets: EntityId[] = []) {}
}
