import { IComponent } from '@/ecs/component';
import { EntityId } from '@/ecs/entity';

export class Follow implements IComponent {
  constructor(readonly id: number, public targetEntity: EntityId) {}
}
