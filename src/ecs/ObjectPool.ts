export class ObjectPool<T> {
  private _allObjects: T[] = [];
  private _inactiveObjects: T[] = [];
  private _activeObjects = new Set<T>()

  constructor(
    private _createFn: () => T,
    public initialSize: number,
    private _deactivateFn?: (item: T) => void,
  ) {
    this._initializePool(initialSize);
  }

  private _initializePool(size: number): void {
    for (let i = 0; i < size; i++) {
      this._addObjectToPool(this._createFn());
    }
  }

  private _addObjectToPool(obj: T): void {
    this._allObjects.push(obj);
    this._inactiveObjects.push(obj);
  }

  private makeObject(): T {
    if (this._inactiveObjects.length > 0) {
      return this._inactiveObjects.pop()!;
    } else {
      const obj = this._createFn();
      this._allObjects.push(obj);
      return obj;
    }
  }

  public acquire(): T {
    const obj = this.makeObject();

    this._activeObjects.add(obj);

    return obj;
  }

  public release(item: T): void {
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
}
