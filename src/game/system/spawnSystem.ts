import { Health } from '../component/health';
import { Location } from '../component/location';
import { Respawn } from '../component/respawn';
import { EntityId } from '@/ecs/entity';
import { ISystem, UpdateSystemData } from '@/ecs/SystemRegistry';
import { range } from '../utils/random';
import { World } from '@/ecs/World';

export class SpawnSystem implements ISystem {
  public entities: EntityId[] = [];
  public respawnEntities: EntityId[] = [];

  constructor(public w: World) {}

  public init() {
    this.entities = this.w.newGroup(this, [Respawn, Health], [Location]);
    this.respawnEntities = this.w.newGroup(this, [Location, Health]);
  }

  private respawnLocation(): { x: number; y: number } {
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
      const x = range(0, 19);
      const y = range(0, 19);

      if (!this.isPositionOccupied(x, y)) {
        return { x, y };
      }
      attempts++;
    }

    throw new Error('No free positions available');
  }

  private isPositionOccupied(x: number, y: number): boolean {
    return this.respawnEntities.some((entity) => {
      if (!this.w.hasComponent(entity, Location)) return false;

      const location = this.w.getComponent(entity, Location);

      return location.position.x === x && location.position.y === y;
    });
  }

  private respawnIfIfExists(
    entity: EntityId,
    health: Health,
    respawn: Respawn
  ) {
    if (!health.current || !respawn.readyToRespawn) return;

    respawn.readyToRespawn = false;

    const { x, y } = this.respawnLocation();

    this.w.addComponent(entity, Location);
    this.w.getComponent(entity, Location).position.set(x, y);
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

  public update({ deltaTime }: UpdateSystemData): void {
    this.entities.forEach((entity) => {
      const health = this.w.getComponent(entity, Health);
      const respawn = this.w.getComponent(entity, Respawn);

      this.respawnIfIfExists(entity, health, respawn);
      this.checkNeedRespawn(health, respawn, deltaTime);
    });
  }
}
