import { IComponent } from '@/ecs/Component';

export class DebugFlag implements IComponent {
  constructor(public isOpen: boolean = false) {}
}
