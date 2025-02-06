import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { GridManager } from '../managers/GridManager';
import { Vector2 } from '../geometry/vector2';
import { EntityId } from '@/ecs/Entity';

export class HunterDirectionSystem implements ISystem {
  public entities = this.w.newGroup(
    ['Hunter', 'Position', 'CanMove'],
    ['Direction']
  );
  public movedEntities = this.w.newGroup(['Hunter', 'Position', 'Moved']);

  constructor(public w: World, private _grid: GridManager) {}

  public update(): void {
    for (let i = 0; i < this.movedEntities.length; i++) {
      const entity = this.movedEntities[i];

      this.w.removeComponent(entity, 'Direction');
    }

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const hunterPosition = this.w.getComponent(entity, 'Position');
      const direction = this.w.getComponent(entity, 'Direction');

      if (this.w.hasComponent(entity, 'Target')) {
        const target = this.w.getComponent(entity, 'Target');

        if (
          target.targetId &&
          !this.w.hasComponent(target.targetId, 'Position')
        ) {
          this.w.removeComponent(entity, 'Target');
        }
      }

      if (this.w.hasComponent(entity, 'Target')) {
        const target = this.w.getComponent(entity, 'Target');

        if (target.targetId) {
          const targetPosition = this.w.getComponent(
            target.targetId,
            'Position'
          );
          const dir = vectorUtils.direction(hunterPosition, targetPosition);

          const nextPosition = vectorUtils.addVector(
            vectorUtils.copy(hunterPosition),
            dir
          );

          if (this.isPositionFree(entity, nextPosition)) {
            vectorUtils.setVector(direction, dir);
            return;
          }
        }
      }

      const alternativeDir = this.findAlternativeDirection(
        entity,
        hunterPosition
      );
      vectorUtils.setVector(direction, alternativeDir);
    }
  }

  private isPositionFree(entity: EntityId, position: Vector2): boolean {
    const entitiesAtPosition = this._grid.getEntitiesInCell(position);

    let len = entitiesAtPosition.length;

    if (len) {
      for (let i = 0; i < entitiesAtPosition.length; i++) {
        const item = entitiesAtPosition[i];

        if (item !== entity && this.w.hasComponent(item, 'Position')) {
          continue;
        }

        len -= 1;
      }
    }

    if (!len) return true;
    if (len > 1) return false;

    const [entity1] = entitiesAtPosition;
    return this.w.hasComponent(entity1, 'Food');
  }

  private findAlternativeDirection(
    entity: EntityId,
    hunterPosition: Vector2
  ): Vector2 {
    const directions: Vector2[] = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    for (const dir of directions) {
      const nextPosition = vectorUtils.addVector(
        vectorUtils.copy(hunterPosition),
        dir
      );

      const isFree = this.isPositionFree(entity, nextPosition);
      if (!isFree) continue;

      return dir;
    }

    return { x: 0, y: 0 };
  }
}
