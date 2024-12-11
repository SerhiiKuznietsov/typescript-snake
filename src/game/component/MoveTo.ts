import { IComponent } from '@/ecs/component';

export class MoveTo implements IComponent {
  constructor(
    readonly id: number,
    public x: number = 0,
    public y: number = 0
  ) {}
}