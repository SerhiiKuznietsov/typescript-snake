import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class RespawnCooldownSystem implements ISystem {
  public entities = this.w.newGroup(['RespawnСooldown']);

  constructor(public w: World) {}

  public update({ deltaTime }: UpdateSystemData): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const respawnСooldown = this.w.getComponent(entity, 'RespawnСooldown');

      respawnСooldown.remainingTime -= deltaTime;
      if (respawnСooldown.remainingTime >= 0) continue;

      this.w.removeComponent(entity, 'RespawnСooldown');
      this.w.getComponent(entity, 'RespawnReady');
    }
  }
}
