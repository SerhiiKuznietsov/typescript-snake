export type ObserverType<D> = (data: D) => void;

export class Observable<D> {
  private observers = new Set<ObserverType<D>>();

  public attach(observer: ObserverType<D>): this {
    if (this.observers.has(observer)) {
      throw new Error(`Duplicate observer`);
    }

    this.observers.add(observer);

    return this;
  }

  public detach(observer: ObserverType<D>): this {
    if (!this.observers.has(observer)) {
      throw new Error(`Duplicate observer`);
    }

    this.observers.delete(observer);

    return this;
  }

  public notify(data: D): this {
    this.observers.forEach((observer) => observer(data));

    return this;
  }
}
