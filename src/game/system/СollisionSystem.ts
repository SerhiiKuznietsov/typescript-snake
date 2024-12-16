import { CollisionOpponent } from '../component/CollisionOpponent';
import { Position } from '../component/Position';
import { EntityId } from '@/ecs/Entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Collider } from '../component/Collider';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';

export class CollisionSystem implements ISystem {
  public entities = this.w.newGroup([Position, Collider]);
  public collisionEntities = this.w.newGroup([
    Position,
    Collider,
    CollisionOpponent,
  ]);

  constructor(public w: World, private _grid: GridManager) {}

  private clearCollisionOpponentIfExists() {
    this.collisionEntities.forEach((entity) => {
      const collisionOpponent = this.w.getComponent(entity, CollisionOpponent);

      collisionOpponent.entities = [];
      collisionOpponent.isActive = false;
    });
  }

  private addToCollisionOpponentIfExists(entityA: EntityId, entityB: EntityId) {
    if (!this.w.hasComponent(entityA, CollisionOpponent)) return;

    const collisionOpponent = this.w.getComponent(entityA, CollisionOpponent);

    collisionOpponent.entities.push(entityB);
    collisionOpponent.isActive = true;
  }

  public update(): void {
    this.clearCollisionOpponentIfExists();

    this.collisionEntities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const nearbyEntities = this._grid.getEntitiesNearby(position);

      nearbyEntities.forEach((otherEntity) => {
        if (entity === otherEntity) return;

        const otherPosition = this.w.getComponent(otherEntity, Position);
        if (vectorUtils.isEqual(position, otherPosition)) {
          this.addToCollisionOpponentIfExists(entity, otherEntity);
          this.addToCollisionOpponentIfExists(otherEntity, entity);
        }
      });
    });
  }
}
