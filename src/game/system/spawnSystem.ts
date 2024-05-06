import { Health } from '../component/health';
import { Location } from '../component/location';
import { Respawn } from '../component/respawn';
import { Entity } from '../entity/entity';
import { UpdateSystemData } from '../manager/type';
import { range } from '../utils/random';
import { System } from './system';

export class SpawnSystem extends System {
  public requiredComponents = [Respawn, Health];

  private respawnLocation(entities: Entity[]): { x: number; y: number } {
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      const x = range(0, 19);
      const y = range(0, 19);

      if (!this.isPositionOccupied(x, y, entities)) {
        return { x, y };
      }
      attempts++;
    }

    throw new Error('No free positions available');
  }

  private isPositionOccupied(
    x: number,
    y: number,
    entities: Entity[]
  ): boolean {
    return entities.some((entity) => {
      if (!entity.has(Location)) return false;

      const location = entity.get(Location);

      return location.position.x === x && location.position.y === y;
    });
  }

  private respawnIfIfExists(
    entity: Entity,
    entities: Entity[],
    health: Health,
    respawn: Respawn
  ) {
    if (!health.current || !respawn.readyToRespawn) return;

    respawn.readyToRespawn = false;

    if (!entity.has(Location)) return;

    const location = entity.get(Location);

    const { x, y } = this.respawnLocation(entities);
    location.position.set(x, y);
  }

  private checkNeedRespawn(
    health: Health,
    respawn: Respawn,
    deltaTime: number
  ) {
    if (!health.current && !respawn.remainingTime && !respawn.readyToRespawn) {
      respawn.remainingTime = respawn.respawnTime;
    }

    if (respawn.remainingTime < 1) return;

    respawn.remainingTime -= deltaTime;

    if (respawn.remainingTime > 0) return;

    respawn.remainingTime = 0;

    respawn.readyToRespawn = true;
  }

  public update({ deltaTime, entities }: UpdateSystemData): void {
    this._entities.forEach((entity) => {
      const health = entity.get(Health);
      const respawn = entity.get(Respawn);

      this.respawnIfIfExists(entity, entities, health, respawn);
      this.checkNeedRespawn(health, respawn, deltaTime);
    });
  }
}
