export class IdManager {
  private _nextId: number;

  constructor(private _minId = 0) {
    this._nextId = this._minId;
  }

  public generateId(): number {
    return this._nextId++;
  }

  public clear() {
    this._nextId = this._minId;
  }
}
