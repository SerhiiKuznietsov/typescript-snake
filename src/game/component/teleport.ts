import { IComponent } from '../../ecs/component';

export class Teleport implements IComponent {
  public isActive: boolean;

  constructor(readonly id: number, isActive: boolean = true) {
    this.isActive = isActive;
  }
}
