import { State } from "./state/state";
import { StateList } from "./type/type";

export class StateController<S, A> {
  private _state = new Map<S, State<S, A>>();
  private _activeState: S;

  constructor(defaultState: S, stateList: StateList<State<S, A>>) {
    this._activeState = defaultState;
    stateList.forEach((state: State<S, A>) => {
      this._state.set(state.name, state);
    });
  }

  private has(stateName: S): boolean {
    return this._state.has(stateName);
  }

  private change(stateName: S): S {
    if (!this.has(stateName)) {
      throw new Error(`State with name ${stateName} not found`);
    }

    this._activeState = stateName;

    return stateName;
  }

  public changeByAction(actionName: A): S | undefined {
    const activeState = this.getActive();

    const newState = activeState.useAction(actionName);

    if (newState) {
      this.change(newState);
    }

    return newState;
  }

  public changeByActionThrowable(actionName: A): S {
    const newState = this.changeByAction(actionName);

    if (!newState) {
      throw new Error(
        `action named "${actionName}" did not change the state "${
          this.getActive().name
        }"`
      );
    }

    return newState;
  }

  public getActive(): State<S, A> {
    const activeState = this._state.get(this._activeState);

    if (!activeState) {
      throw new Error(`Active state not found with name: ${this._activeState}`);
    }

    return activeState;
  }
}
