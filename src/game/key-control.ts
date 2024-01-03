export class KeyControl<E> {
  private _element: any;
  private _eventName: string;
  private _handler: (e: E) => void;


  constructor(element: any, eventName: string, handler: (e: E) => void) {
    if (!element) {
      throw new Error('Element is undefined');
    }

    this._element = element;
    this._eventName = eventName;
    this._handler = handler;
  };

  on() {
    this._element?.addEventListener(this._eventName, this._handler);
  }

  off() {
    this._element?.removeEventListener(this._eventName, this._handler);
  }
}
