export class IdManager {
  private _nextId: number;

  constructor(private _minId = 1) {
    this._nextId = this._minId;
  }

  public generateId(): number {
    return this._nextId++;
  }

  public clear(): void {
    this._nextId = this._minId;
  }
}
