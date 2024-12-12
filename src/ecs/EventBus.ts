export class EventBus {
  private _listeners: Map<string, Set<(payload: any) => void>> = new Map();

  public on(eventType: string, callback: (payload: any) => void): void {
    if (!this._listeners.has(eventType)) {
      this._listeners.set(eventType, new Set());
    }
    this._listeners.get(eventType)!.add(callback);
  }

  public off(eventType: string, callback: (payload: any) => void): void {
    this._listeners.get(eventType)?.delete(callback);
  }

  public emit(eventType: string, payload: any): void {
    const listeners = this._listeners.get(eventType);
    if (listeners) {
      listeners.forEach((callback) => callback(payload));
    }
  }

  public clear() {
    this._listeners.clear();
  };
}
