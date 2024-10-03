export class IdManager {
  private _nextId: number = 0;

  generateId(): number {
    return this._nextId++;
  }
}
