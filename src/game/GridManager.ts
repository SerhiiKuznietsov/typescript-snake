import { EntityId } from '@/ecs/Entity';
import { Vector2 } from './geometry/vector2';

export class GridManager {
  private _grid: Map<string, Set<EntityId>> = new Map();

  constructor(private _cellSize: number) {}

  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this._cellSize);
    const cellY = Math.floor(y / this._cellSize);
    return `${cellX}-${cellY}`;
  }

  public addEntity(entityId: EntityId, position: Vector2): void {
    const key = this.getCellKey(position.x, position.y);

    if (!this._grid.has(key)) {
      this._grid.set(key, new Set());
    }

    this._grid.get(key)!.add(entityId);
  }

  public removeEntity(entityId: EntityId, position: Vector2): void {
    const key = this.getCellKey(position.x, position.y);

    const cell = this._grid.get(key);
    if (!cell) {
      console.warn(
        `Entity: "${entityId}" with position = x: ${position.x}, y: ${position.y} not found`
      );

      return;
    }

    cell.delete(entityId);
    if (cell.size === 0) {
      this._grid.delete(key);
    }
  }

  public moveEntity(
    entityId: EntityId,
    oldPosition: Vector2,
    newPosition: Vector2
  ): void {
    this.removeEntity(entityId, oldPosition);
    this.addEntity(entityId, newPosition);
  }

  public getEntitiesInCell(x: number, y: number): Set<EntityId> {
    const key = this.getCellKey(x, y);
    return this._grid.get(key) || new Set();
  }

  public getEntitiesNearby(position: Vector2): Set<EntityId> {
    const nearbyEntities: Set<EntityId> = new Set();

    const offsets = [-1, 0, 1];

    for (let i = 0; i < offsets.length; i++) {
      const dx = offsets[i];

      for (let j = 0; j < offsets.length; j++) {
        const dy = offsets[j];

        const key = this.getCellKey(
          position.x + dx * this._cellSize,
          position.y + dy * this._cellSize
        );
        const entities = this._grid.get(key);
        if (!entities || !entities.size) continue;

        entities.forEach((entity) => nearbyEntities.add(entity));
      }
    }

    return nearbyEntities;
  }

  public clear(): void {
    this._grid.clear();
  }
}
