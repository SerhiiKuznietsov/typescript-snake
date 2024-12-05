import { IComponent } from '@/ecs/component';
import { Entity } from '@/ecs/entity';

export class Tail implements IComponent {
  constructor(readonly id: number, public segments: Entity[] = []) {}
}
