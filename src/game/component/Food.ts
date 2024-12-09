import { IComponent } from '@/ecs/component';

export class Food implements IComponent {
  constructor(readonly id: number) {}
}
