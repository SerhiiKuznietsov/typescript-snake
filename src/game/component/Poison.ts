import { IComponent } from '@/ecs/component';

export class Poison implements IComponent {
  constructor(readonly id: number) {}
}
