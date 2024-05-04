import { ActionList } from '../type/type';

export class State<S, A> {
  public readonly name: S;
  protected _actions = new Map<A, S>();

  constructor(name: S, list?: ActionList<A, S>) {
    this.name = name;
    this.addActionsList(list);
  }

  protected get(actionName: A): S {
    const newStateName = this._actions.get(actionName);

    if (!newStateName) {
      throw new Error(
        `State name with action name: ${actionName} is undefined`
      );
    }

    return newStateName;
  }

  public useAction(actionName: A): S | undefined {
    if (!this._actions.has(actionName)) return;

    return this.get(actionName);
  }

  protected addActionsList(list?: ActionList<A, S>): void {
    list?.forEach(([actionName, stateName]) => {
      this.addActionItem(actionName, stateName);
    });
  }

  protected addActionItem(actionName: A, stateName: S) {
    if (this._actions.has(actionName)) {
      throw new Error(`Not unique action name: ${actionName}`);
    }

    this._actions.set(actionName, stateName);
  }
}
