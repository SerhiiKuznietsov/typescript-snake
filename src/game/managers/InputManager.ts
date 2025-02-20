const controller = new AbortController();
controller.signal;

type KeyCodeType = KeyboardEvent['code'];

export class InputManager {
  private _mapCodeHandler = new Map<KeyCodeType, Function[]>();
  private _controller = new AbortController();
  private _active: boolean = false;

  constructor() {
    this.on();
  }

  private rootHandler = (e: KeyboardEvent): void => {
    const handlerArr = this._mapCodeHandler.get(e.code);

    if (!handlerArr?.length) return;

    handlerArr.forEach((handlerItem) => handlerItem(e));
  };

  public isActive(): boolean {
    return this._active;
  }

  public toggle(): void {
    this._active ? this.off() : this.on();
  }

  public on(): this {
    if (this._active) return this;

    this._active = true;
    this._controller = new AbortController();
    const signal = this._controller.signal;

    document.addEventListener('keydown', this.rootHandler, { signal });

    return this;
  }

  public off(): this {
    if (!this._active) return this;

    this._active = false;
    this._controller.abort();

    return this;
  }

  public addHandler(keyCode: KeyCodeType, handler: Function): this {
    if (!this._mapCodeHandler.has(keyCode)) {
      this._mapCodeHandler.set(keyCode, []);
    }

    this._mapCodeHandler.get(keyCode)!.push(handler);

    return this;
  }

  public removeHandler(keyCode: KeyCodeType, handler: Function): this {
    if (!this._mapCodeHandler.has(keyCode)) return this;

    const handlerArr = this._mapCodeHandler.get(keyCode) as Function[];

    const index = handlerArr.indexOf(handler);

    if (index < 0) return this;

    handlerArr.splice(index, 1);

    if (!handlerArr.length) this._mapCodeHandler.delete(keyCode);

    return this;
  }

  public removeHandlersByCode(keyCode: KeyCodeType): this {
    this._mapCodeHandler.delete(keyCode);

    return this;
  }
}
