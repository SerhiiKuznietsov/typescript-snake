import { IComponent } from '@/ecs/component';
import { EntityId } from '@/ecs/entity';

export class Tail implements IComponent {
  constructor(readonly id: number, public segments: EntityId[] = []) {}
}
