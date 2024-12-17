import { IComponent } from '@/ecs/Component';

export class SnakeBody implements IComponent {
  constructor(readonly id: number) {}
}
