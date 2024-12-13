import { EntityId } from '../Entity';
import { BitUtils } from '../utils/bit';

export class BitMapManager {
  private _componentToBitMap: Map<string, number> = new Map();
  private _entityBitMaps: Map<EntityId, number> = new Map();

  public createEntity(entityId: EntityId): void {
    this._entityBitMaps.set(entityId, 0);
  }

  public deleteEntity(entityId: EntityId): void {
    this._entityBitMaps.delete(entityId);
  }

  public hasComponentBit(componentKey: string): boolean {
    return this._componentToBitMap.has(componentKey);
  }

  public getComponentBit(componentKey: string): number {
    const bit = this._componentToBitMap.get(componentKey);
    if (bit === undefined) {
      throw new Error(
        `Component key '${componentKey}' does not exist in the bitmap.`
      );
    }
    return bit;
  }

  public createComponentBit(componentKey: string): number {
    if (this._componentToBitMap.has(componentKey)) {
      return this._componentToBitMap.get(componentKey)!;
    }

    const newBit = 1 << this._componentToBitMap.size;
    this._componentToBitMap.set(componentKey, newBit);

    return newBit;
  }

  public addComponentBitToEntity(
    entityId: EntityId,
    componentKey: string
  ): void {
    const componentBit = this.createComponentBit(componentKey);
    const currentBit = this._entityBitMaps.get(entityId) || 0;
    const newBit = BitUtils.setBit(currentBit, componentBit);

    this._entityBitMaps.set(entityId, newBit);
  }

  public removeComponentBitFromEntity(
    entityId: EntityId,
    componentKey: string
  ): void {
    const componentBit = this.getComponentBit(componentKey);
    const currentBit = this._entityBitMaps.get(entityId) || 0;
    const newBit = BitUtils.clearBit(currentBit, componentBit);

    this._entityBitMaps.set(entityId, newBit);
  }

  public getEntityBitMap(entityId: EntityId): number {
    return this._entityBitMaps.get(entityId) as number;
  }

  public getEntitiesMatchingBitMap(bitMap: number): EntityId[] {
    const matchingEntities: EntityId[] = [];

    this._entityBitMaps.forEach((entityBitMap, entityId) => {
      if (BitUtils.areAllBitsSet(entityBitMap, bitMap)) {
        matchingEntities.push(entityId);
      }
    });

    return matchingEntities;
  }

  public clear(): void {
    this._componentToBitMap.clear();
    this._entityBitMaps.clear();
  }
}
