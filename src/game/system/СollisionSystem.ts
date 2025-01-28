import { EntityId } from '@/ecs/Entity';
import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../GridManager';

export class CollisionSystem implements ISystem {
  public entities = this.w.newGroup(['Position', 'CollisionHandler', 'Moved']);

  constructor(public w: World, private _grid: GridManager) {}

  private addToCollisionOpponent(entityA: EntityId, entityB: EntityId) {
    const collision = this.w.getComponent(entityA, 'CollisionDetected');

    this.w.removeComponent(entityA, 'CollisionDetected', 'BEFORE_SYSTEM');

    collision.target = entityB;
  }

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
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
    }
  }
}
