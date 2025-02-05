import { EventMap } from '../EcsEvents';
import { EntityId } from '../Entity';
import { EventBus } from '../EventBus';
import { BitUtils } from '../utils/bit';

export class BitMapManager {
  private _componentToBitMap: Map<string, number> = new Map();
  private _entityBitMaps: Map<EntityId, number> = new Map();

  constructor(private _eventBus: EventBus<EventMap>) {
    this._eventBus.on('COMPONENT_ADDED', this.onEntityComponentCreated);
    this._eventBus.on('COMPONENT_REMOVED', this.onEntityComponentDeleted);
    this._eventBus.on('ENTITY_CREATED', this.onEntityCreated);
    this._eventBus.on('ENTITY_DELETED', this.onEntityDeleted);
  }

  private onEntityCreated = ({ entity }: EventMap['ENTITY_CREATED']) => {
    this.createEntity(entity);
  };

  private onEntityDeleted = ({ entity }: EventMap['ENTITY_DELETED']) => {
    this.deleteEntity(entity);
  };

  private onEntityComponentCreated = ({
    entity,
    componentName,
  }: EventMap['COMPONENT_ADDED']) => {
    this.addComponentBitToEntity(entity, componentName);
  };

  private onEntityComponentDeleted = ({
    entity,
    componentName,
  }: EventMap['COMPONENT_REMOVED']) => {
    this.removeComponentBitFromEntity(entity, componentName);
  };

  private createEntity(entity: EntityId): void {
    this._entityBitMaps.set(entity, 0);
  }

  private deleteEntity(entity: EntityId): void {
    this._entityBitMaps.delete(entity);
  }

  private hasComponentBit(componentKey: string): boolean {
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
    if (this.hasComponentBit(componentKey)) {
      return this._componentToBitMap.get(componentKey)!;
    }

    const newBit = 1 << this._componentToBitMap.size;
    this._componentToBitMap.set(componentKey, newBit);

    return newBit;
  }

  public addComponentBitToEntity(entity: EntityId, componentKey: string): void {
    const componentBit = this.createComponentBit(componentKey);
    const currentBit = this._entityBitMaps.get(entity) || 0;
    const newBit = BitUtils.setBit(currentBit, componentBit);

    this._entityBitMaps.set(entity, newBit);
  }

  public removeComponentBitFromEntity(
    entity: EntityId,
    componentKey: string
  ): void {
    const componentBit = this.getComponentBit(componentKey);
    const currentBit = this._entityBitMaps.get(entity) || 0;
    const newBit = BitUtils.clearBit(currentBit, componentBit);

    this._entityBitMaps.set(entity, newBit);
  }

  public getEntityBitMap(entity: EntityId): number {
    return this._entityBitMaps.get(entity) as number;
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
