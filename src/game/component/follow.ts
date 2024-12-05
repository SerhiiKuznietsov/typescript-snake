import { IComponent } from '@/ecs/component';
import { Entity } from '@/ecs/entity';

export class Follow implements IComponent {
  constructor(readonly id: number, public targetEntity: Entity) {}
}
