import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';

export class RespawnTriggerSystem implements ISystem {
  public entities = this.w.newGroup(['Respawn'], ['Position', 'RespawnСooldown']);

  constructor(public w: World) {}

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const respawn = this.w.getComponent(entity, 'Respawn');

      this.w.getComponent(entity, 'RespawnСooldown', {
        remainingTime: respawn.cooldown,
      });
    }
  }
}
