export class InputManager {
  private _mapCodeHandler = new Map<string, Function[]>();

  constructor() {
    this.on();
  }

  private rootHandler = (e: KeyboardEvent): void => {
    const handlerArr = this._mapCodeHandler.get(e.code);

    if (!handlerArr || !handlerArr.length) return;

    handlerArr.forEach((handlerItem) => handlerItem(e));
  };

  public on(): this {
    document.addEventListener('keydown', this.rootHandler);

    return this;
  }

  public off(): this {
    document.removeEventListener('keydown', this.rootHandler);

    return this;
  }

  public addHandler(keyCode: KeyboardEvent['code'], handler: Function): this {
    if (!this._mapCodeHandler.has(keyCode)) {
      this._mapCodeHandler.set(keyCode, []);
    }

    this._mapCodeHandler.get(keyCode)!.push(handler);

    return this;
  }

  public removeHandler(
    keyCode: KeyboardEvent['code'],
    handler: Function
  ): this {
    if (!this._mapCodeHandler.has(keyCode)) return this;

    const handlerArr = this._mapCodeHandler.get(keyCode) as Function[];

    const index = handlerArr.indexOf(handler);

    if (index < 0) return this;

    handlerArr.splice(index, 1);

    if (!handlerArr.length) this._mapCodeHandler.delete(keyCode);

    return this;
  }

  public removeHandlersByCode(keyCode: string): this {
    this._mapCodeHandler.delete(keyCode);

    return this;
  }
}
