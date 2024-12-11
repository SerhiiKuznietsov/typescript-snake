import { IComponent } from '@/ecs/component';
import { EntityId } from '@/ecs/entity';

export class Snake implements IComponent {
  public segments: EntityId[] = [];

  constructor(readonly id: number) {}
}
