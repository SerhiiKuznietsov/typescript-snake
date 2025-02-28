import { EntityId } from '@/ecs/Entity';
import { Vector2 } from '../geometry/vector2';
import { createKey, parseKey } from '../utils/id';
import { range } from '../utils/random';

type KetType = string;
export class GridManager {
  private _grid: Map<KetType, Set<EntityId>> = new Map();
  private _emptyGrid: Set<KetType> = new Set();
  private _entitiesGrid: Map<EntityId, KetType> = new Map();

  public init({ x, y }: Vector2): void {
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        const key = createKey(j, i);

        this._emptyGrid.add(key);
      }
    }
  }

  public hasEntity(entity: EntityId): boolean {
    return this._entitiesGrid.has(entity);
  }

  public addEntity(entity: EntityId, { x, y }: Vector2): void {
    const key = createKey(x, y);
    if (!this._grid.has(key)) {
      this._grid.set(key, new Set());
    }

    this._grid.get(key)!.add(entity);

    this._entitiesGrid.set(entity, key);
    this._emptyGrid.delete(key);
  }

  public removeEntity(entity: EntityId): void {
    const key = this._entitiesGrid.get(entity);
    if (!key) {
      throw new Error(`Entity with id: "${entity}" not found`);
    }

    this._entitiesGrid.delete(entity);

    const cellEntities = this._grid.get(key);
    if (!cellEntities) {
      throw new Error(`Entity: "${entity}" with key: "${key}" not found`);
    }

    cellEntities.delete(entity);
    if (cellEntities.size !== 0) return;

    this._emptyGrid.add(key);
    this._grid.delete(key);
  }

  public moveEntity(entity: EntityId, newPosition: Vector2): void {
    this.removeEntity(entity);
    this.addEntity(entity, newPosition);
  }

  public getEmptyCell(): Vector2 | undefined {
    if (this._emptyGrid.size === 0) return;

    const randomNum = range(0, this._emptyGrid.size - 1);

    const key = [...this._emptyGrid.keys()][randomNum];

    this._emptyGrid.delete(key);

    return parseKey(key);
  }

  public getEntitiesInCell({ x, y }: Vector2): Array<EntityId> {
    const key = createKey(x, y);
    const set = this._grid.get(key) || new Set();

    return [...set];
  }

  public clear(): void {
    this._grid.clear();
    this._emptyGrid.clear();
    this._entitiesGrid.clear();
  }
}
