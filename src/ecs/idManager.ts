export class IdManager {
  private _nextId: number = 0;

  public generateId(): number {
    return this._nextId++;
  }
}
