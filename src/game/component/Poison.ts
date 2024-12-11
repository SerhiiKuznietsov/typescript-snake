import { IComponent } from '@/ecs/Component';

export class Poison implements IComponent {
  constructor(readonly id: number) {}
}
