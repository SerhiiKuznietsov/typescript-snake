import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { Position } from '../component/Position';
import { EntityId } from '@/ecs/Entity';
import { vectorUtils } from '../geometry/utils/vectorUtils';

export class HunterTargetSystem implements ISystem {
  public entities = this.w.newGroup(['Hunter', 'Position', 'Target']);
  public entitiesWithoutTarget = this.w.newGroup(
    ['Hunter', 'Position'],
    ['Target']
  );
  public foodEntities = this.w.newGroup(['Food', 'Position'], ['Death']);

  constructor(public w: World) {}

  private findClosestFood(hunterPosition: Position): EntityId | null {
    let closestFoodId: EntityId | null = null;
    let minDistance = Infinity;

    this.foodEntities.forEach((entityId) => {
      const foodPosition = this.w.getComponent(entityId, 'Position');
      const distance = vectorUtils.distance(hunterPosition, foodPosition);

      if (distance < minDistance) {
        minDistance = distance;
        closestFoodId = entityId;
      }
    });

    return closestFoodId;
  }

  public update(): void {
    this.entitiesWithoutTarget.forEach((entityId) => {
      const hunterPosition = this.w.getComponent(entityId, 'Position');
      const closestFoodId = this.findClosestFood(hunterPosition);

      if (!closestFoodId) return;

      this.w.getComponent(entityId, 'Target', { targetId: closestFoodId });
    });

    this.entities.forEach((e) => {
      // TODO
    });
  }
}
