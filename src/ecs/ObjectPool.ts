export type ObjectPoolParams<T> = {
  initialSize?: number;
  deactivate?: (item: T) => void;
  initialize?: (item: T, params?: Partial<T>) => void;
  maxSize?: number;
};

export class ObjectPool<T> {
  private _allObjects: T[] = [];
  private _inactiveObjects: T[] = [];
  private _activeObjects = new Set<T>();

  private _createFn: () => T;
  private _deactivateFn?: (item: T) => void;
  private _initializeFn?: (item: T, params?: Partial<T>) => void;
  private _initialSize: number;
  private _maxSize?: number;

  constructor(create: () => T, params: ObjectPoolParams<T> = {}) {
    const { initialSize = 1, deactivate, initialize, maxSize } = params;

    this._createFn = create;
    this._deactivateFn = deactivate;
    this._initializeFn = initialize;
    this._initialSize = initialSize;
    this._maxSize = maxSize;

    this._initializePool(initialSize);
  }

  private _initializePool(size: number): void {
    for (let i = 0; i < size; i++) {
      this._addObjectToPool(this._createFn());
    }
  }

  private _addObjectToPool(obj: T): void {
    if (this._maxSize && this._allObjects.length >= this._maxSize) {
      throw new Error(
        `Cannot add more objects to the pool. Max size (${this._maxSize}) reached.`
      );
    }
    this._allObjects.push(obj);
    this._inactiveObjects.push(obj);
  }

  private _makeObject(): T {
    if (this._inactiveObjects.length > 0) {
      return this._inactiveObjects.pop()!;
    } else if (!this._maxSize || this._allObjects.length < this._maxSize) {
      const obj = this._createFn();
      this._allObjects.push(obj);
      return obj;
    } else {
      throw new Error('Pool has reached its maximum size.');
    }
  }

  public acquire(params?: Partial<T>): T {
    const obj = this._makeObject();

    if (this._initializeFn) {
      this._initializeFn(obj, params);
    }

    this._activeObjects.add(obj);
    return obj;
  }

  public release(item: T): void {
    if (!this._activeObjects.has(item)) {
      console.warn('Attempted to release an object that is not active.');
      return;
    }
    if (this._deactivateFn) {
      this._deactivateFn(item);
    }
    this._activeObjects.delete(item);
    this._inactiveObjects.push(item);
  }

  public getAllObjects(): T[] {
    return this._allObjects;
  }

  public getInactiveObjects(): T[] {
    return this._inactiveObjects;
  }

  public getActiveObjects(): T[] {
    return Array.from(this._activeObjects);
  }

  public reset(size?: number): void {
    this._allObjects = [];
    this._inactiveObjects = [];
    this._activeObjects.clear();

    const newSize = size ?? this._initialSize;
    if (newSize < 0) {
      throw new Error('Size of the pool must be non-negative');
    }
    this._initializePool(newSize);
  }

  public get currentSize(): number {
    return this._allObjects.length;
  }

  public get activeCount(): number {
    return this._activeObjects.size;
  }

  public get inactiveCount(): number {
    return this._inactiveObjects.length;
  }
}
