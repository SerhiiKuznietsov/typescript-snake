import { Health } from '../component/health';
import { Respawn } from '../component/respawn';
import { System } from './system';

export class RespawnSystem extends System {
  private clearRespawnIfIfExists(health: Health, respawn: Respawn) {
    if (health.current && respawn.readyToRespawn) {
      respawn.readyToRespawn = false;
    }
  }

  public update(deltaTime: number): void {
    this._entities.forEach((entity) => {
      if (!entity.has(Health) || !entity.has(Respawn)) return;

      const health = entity.get(Health);
      const respawn = entity.get(Respawn);

      this.clearRespawnIfIfExists(health, respawn);

      if (
        !health.current &&
        !respawn.remainingTime &&
        !respawn.readyToRespawn
      ) {
        respawn.remainingTime = respawn.respawnTime;
      }

      if (respawn.remainingTime < 1) return;

      respawn.remainingTime -= deltaTime;

      if (respawn.remainingTime > 0) return;

      respawn.remainingTime = 0;

      respawn.readyToRespawn = true;
    });
  }
}
