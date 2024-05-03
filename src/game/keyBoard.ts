class KeyBoard {
  private _mapCodeHandler = new Map<string, Function[]>();

  private rootHandler = (e: KeyboardEvent): void => {
    // console.log(e.code);

    if (!this._mapCodeHandler.has(e.code)) return;

    const handlerArr = this._mapCodeHandler.get(e.code);

    handlerArr?.forEach((handlerItem) => handlerItem(e));
  };

  public on(): KeyBoard {
    document.addEventListener('keydown', this.rootHandler);

    return this;
  }

  public off(): KeyBoard {
    document.removeEventListener('keydown', this.rootHandler);

    return this;
  }

  public addHandler(keyCode: string, handler: Function): KeyBoard {
    if (!this._mapCodeHandler.has(keyCode)) {
      this._mapCodeHandler.set(keyCode, []);
    }

    this._mapCodeHandler.get(keyCode)?.push(handler);

    return this;
  }

  public removeHandler(keyCode: string, handler: Function): KeyBoard {
    if (!this._mapCodeHandler.has(keyCode)) return this;

    const handlerArr = this._mapCodeHandler.get(keyCode) as Function[];

    const index = handlerArr.indexOf(handler);

    if (index < 0) return this;

    handlerArr.splice(index, 1);

    if (!handlerArr?.length) this._mapCodeHandler.delete(keyCode);

    return this;
  }

  public removeHandlersByCode(keyCode: string): KeyBoard {
    this._mapCodeHandler.delete(keyCode);

    return this;
  }
}

export const keyBoard = new KeyBoard().on();
