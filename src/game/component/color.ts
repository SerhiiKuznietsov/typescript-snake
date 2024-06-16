import { IComponent } from '../../ecs/component';

export class Color implements IComponent {
  constructor(readonly id: number, public value: string) {}
}
