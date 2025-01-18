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

    for (let i = 0; i <  this.foodEntities.length; i++) {
      const entityId =  this.foodEntities[i];

      const foodPosition = this.w.getComponent(entityId, 'Position');
      const distance = vectorUtils.distance(hunterPosition, foodPosition);

      if (distance < minDistance) {
        minDistance = distance;
        closestFoodId = entityId;
      }
    }

    return closestFoodId;
  }

  public update(): void {
    for (let i = 0; i < this.entitiesWithoutTarget.length; i++) {
      const entity = this.entitiesWithoutTarget[i];
      const hunterPosition = this.w.getComponent(entity, 'Position');
      const closestFoodId = this.findClosestFood(hunterPosition);

      if (!closestFoodId) return;

      this.w.getComponent(entity, 'Target', { targetId: closestFoodId });
    }
  }
}
