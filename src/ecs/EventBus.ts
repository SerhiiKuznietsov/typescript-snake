type SetType<K extends keyof T, T extends Record<string, any>> = Set<
  (payload: T[K]) => void
>;

export class EventBus<T extends Record<string, any>> {
  private _listeners: Map<keyof T, Set<(payload: T[keyof T]) => void>> =
    new Map();

  public has<K extends keyof T>(eventType: K): boolean {
    return this._listeners.has(eventType);
  }

  public on<K extends keyof T>(
    eventType: K,
    callback: (payload: T[K]) => void
  ): this {
    if (!this.has(eventType)) {
      this._listeners.set(eventType, new Set());
    }

    const listeners = this._listeners.get(eventType) as SetType<K, T>;
    listeners.add(callback);

    return this;
  }

  public off<K extends keyof T>(
    eventType: K,
    callback: (payload: T[K]) => void
  ): this {
    const listeners = this._listeners.get(eventType) as SetType<K, T>;
    listeners?.delete(callback);

    return this;
  }

  public emit<K extends keyof T>(eventType: K, payload: T[K]): void {
    const listeners = this._listeners.get(eventType) as SetType<K, T>;
    if (!listeners) return;

    listeners.forEach((callback) => callback(payload));
  }

  public clear(): void {
    this._listeners.clear();
  }
}
