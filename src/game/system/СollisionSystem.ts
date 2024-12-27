import { EntityId } from '@/ecs/Entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';

export class CollisionSystem implements ISystem {
  public entities = this.w.newGroup(['Position', 'Collider']);
  public movementEntities = this.w.newGroup([
    'Position',
    'CollisionHandler',
    'Moved',
  ]);
  public collisionDetectedEntities = this.w.newGroup(['CollisionDetected']);

  constructor(public w: World, private _grid: GridManager) {}

  private clearCollisionDetected() {
    this.collisionDetectedEntities.forEach((entity) => {
      this.w.removeComponent(entity, 'CollisionDetected');
    });
  }

  private addToCollisionOpponent(entityA: EntityId, entityB: EntityId) {
    const collision = this.w.getComponent(entityA, 'CollisionDetected');

    collision.target = entityB;
  }

  public update(): void {
    this.clearCollisionDetected();

    this.movementEntities.forEach((entity) => {
      const position = this.w.getComponent(entity, 'Position');
      const nearbyEntities = this._grid.getEntitiesNearby(position);

      for (let i = 0; i < nearbyEntities.length; i++) {
        const otherEntity = nearbyEntities[i];

        if (entity === otherEntity) continue;

        const otherPosition = this.w.getComponent(otherEntity, 'Position');
        if (!vectorUtils.isEqual(position, otherPosition)) continue;


        this.addToCollisionOpponent(entity, otherEntity);
        break;
      }
    });
  }
}
