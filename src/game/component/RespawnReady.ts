import { IComponent } from '@/ecs/component';

export class RespawnReady implements IComponent {
  constructor(readonly id: number) {}
}
