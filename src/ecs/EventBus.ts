export class EventBus {
  private listeners: Map<string, Set<(payload: any) => void>> = new Map();

  public on(eventType: string, callback: (payload: any) => void): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);
  }

  public off(eventType: string, callback: (payload: any) => void): void {
    this.listeners.get(eventType)?.delete(callback);
  }

  public emit(eventType: string, payload: any): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach((callback) => callback(payload));
    }
  }
}
