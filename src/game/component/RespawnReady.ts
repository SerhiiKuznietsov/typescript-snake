import { IComponent } from '@/ecs/Component';

export class RespawnReady implements IComponent {
  constructor(readonly id: number) {}
}
