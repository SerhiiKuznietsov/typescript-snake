import { Respawn } from '../component/Respawn';
import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { RespawnReady } from '../component/RespawnReady';
import { Position } from '../component/Position';

export class RespawnCooldownSystem implements ISystem {
  public entities = this.w.newGroup(this, [Respawn], [Position]);

  constructor(public w: World) {}

  public update({ deltaTime }: UpdateSystemData): void {
    this.entities.forEach((entity) => {
      const respawn = this.w.getComponent(entity, Respawn);

      if (respawn.elapsed < respawn.cooldown) {
        respawn.elapsed += deltaTime;
      } else {
        this.w.getComponent(entity, RespawnReady);
        respawn.elapsed = 0;
      }
    });
  }
}
