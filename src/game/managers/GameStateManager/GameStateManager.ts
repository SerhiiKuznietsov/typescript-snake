export interface GameState {
  allowedTransitions: string[];
  enter?(): void;
  update?(delta: number): void;
  exit?(): void;
}

export class GameStateManager {
  private _stateStorage = new Map<string, GameState>();
  private declare _currentState: GameState;

  constructor(private _states: GameState[]) {
    this._states.forEach((state) =>
      this._stateStorage.set(state.constructor.name, state)
    );
  }

  get currentState(): string {
    return this._currentState.constructor.name;
  }

  public init(stateName: string) {
    const initState = this._states.find(
      (state) => state.constructor.name === stateName
    );

    if (!initState) {
      throw new Error('init state no found');
    }

    this._currentState = initState;
    this._currentState.enter && this._currentState.enter();
  }

  public changeState(stateName: string) {
    const newState = this._stateStorage.get(stateName);
    if (!newState) {
      throw new Error(`State "${stateName}" not found in storage.`);
    }

    const {
      allowedTransitions,
      constructor: { name: currentStateName },
    } = this._currentState;

    if (!allowedTransitions.includes(stateName)) {
      throw new Error(`
        Transition from "${currentStateName}" to "${stateName}" is not allowed.
        Allowed transitions: ${allowedTransitions.join(', ')}
      `);
    }

    console.log(`GameStateManager. New state: ${stateName}`);

    this._currentState.exit && this._currentState.exit();
    this._currentState = newState;
    this._currentState.enter && this._currentState.enter();
  }

  public update(delta: number) {
    this._currentState.update && this._currentState?.update(delta);
  }
}
