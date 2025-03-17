import { ComponentMap } from '@/game/component/components';
import { EntityId } from '../Entity';
import { BitUtils } from '../utils/bit';

export class BitMapManager {
  private _componentToBitMap: Map<string, number> = new Map();
  private _entityBitMaps: Map<EntityId, number> = new Map();

  private hasComponentBit(componentName: string): boolean {
    return this._componentToBitMap.has(componentName);
  }

  public onEntityCreated(entity: EntityId): void {
    this._entityBitMaps.set(entity, 0);
  }

  public onEntityDeleted(entity: EntityId): void {
    this._entityBitMaps.delete(entity);
  }

  public onEntityComponentCreated(
    entity: EntityId,
    componentName: keyof ComponentMap
  ) {
    const componentBit = this.getComponentBit(componentName);
    const currentBit = this._entityBitMaps.get(entity) || 0;
    const newBit = BitUtils.setBit(currentBit, componentBit);

    this._entityBitMaps.set(entity, newBit);
  }

  public onEntityComponentDeleted(
    entity: EntityId,
    componentName: keyof ComponentMap
  ) {
    const componentBit = this.getComponentBit(componentName);
    const currentBit = this._entityBitMaps.get(entity) || 0;
    const newBit = BitUtils.clearBit(currentBit, componentBit);

    this._entityBitMaps.set(entity, newBit);
  }

  public getComponentBit(componentName: string): number {
    const bit = this._componentToBitMap.get(componentName);
    if (bit === undefined) {
      throw new Error(
        `Component key '${componentName}' does not exist in the bitmap.`
      );
    }
    return bit;
  }

  public onRegisterComponent(componentName: string): number {
    if (this.hasComponentBit(componentName)) {
      throw new Error(`component with name: "${componentName}" already exist`);
    }

    const newBit = 1 << this._componentToBitMap.size;
    this._componentToBitMap.set(componentName, newBit);

    return newBit;
  }

  public getEntityBitMap(entity: EntityId): number {
    const bit = this._entityBitMaps.get(entity);
    if (bit === undefined) {
      throw new Error(`bit with entity: ${entity} not found`);
    }

    return bit;
  }

  public getEntitiesMatchingBitMap(bitMap: number): EntityId[] {
    const matchingEntities: EntityId[] = [];

    this._entityBitMaps.forEach((entityBitMap, entity) => {
      if (BitUtils.areAllBitsSet(entityBitMap, bitMap)) {
        matchingEntities.push(entity);
      }
    });

    return matchingEntities;
  }

  public clear(): void {
    this._componentToBitMap.clear();
    this._entityBitMaps.clear();
  }
}
