import { Position } from '../component/Position';
import { EntityId } from '@/ecs/Entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Collider } from '../component/Collider';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';
import { CollisionDetected } from '../component/CollisionDetected';
import { Snake } from '../component/Snake';

export class CollisionSystem implements ISystem {
  public entities = this.w.newGroup([Position, Collider, Snake]);
  public collisionDetectedEntities = this.w.newGroup([CollisionDetected]);

  constructor(public w: World, private _grid: GridManager) {}

  private clearCollisionDetected() {
    this.collisionDetectedEntities.forEach((entity) => {
      this.w.getComponent(entity, CollisionDetected).opponents.length = 0;
      this.w.removeComponent(entity, CollisionDetected);
    });
  }

  private addToCollisionOpponent(entityA: EntityId, entityB: EntityId) {
    const collision = this.w.getComponent(entityA, CollisionDetected);

    if (collision.opponents.includes(entityB) || entityA === entityB) return;

    collision.opponents.push(entityB);
  }

  public update(): void {
    this.clearCollisionDetected();

    this.entities.forEach((entity) => {
      const position = this.w.getComponent(entity, Position);
      const nearbyEntities = this._grid.getEntitiesNearby(position);

      nearbyEntities.forEach((otherEntity) => {
        if (entity === otherEntity) return;

        const otherPosition = this.w.getComponent(otherEntity, Position);
        if (vectorUtils.isEqual(position, otherPosition)) {
          this.addToCollisionOpponent(entity, otherEntity);
        }
      });
    });
  }
}
