import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class RespawnCooldownSystem implements ISystem {
  public entities = this.w.newGroup(['Respawn'], ['Position']);

  constructor(public w: World) {}

  public update({ deltaTime }: UpdateSystemData): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const respawn = this.w.getComponent(entity, 'Respawn');

      respawn.elapsed += deltaTime;
      if (respawn.elapsed < respawn.cooldown) return;

      respawn.elapsed = 0;
      this.w.getComponent(entity, 'RespawnReady');
    }
  }
}
