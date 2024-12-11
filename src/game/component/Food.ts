import { IComponent } from '@/ecs/Component';

export class Food implements IComponent {
  constructor(readonly id: number) {}
}
