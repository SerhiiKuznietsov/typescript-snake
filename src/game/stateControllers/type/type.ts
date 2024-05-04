export type StateList<S> = Array<S>;
export type ActionList<A, S> = Array<[A, S]>;

export enum GameStateList {
  init = 'init',
  start = 'start',
  readyToStart = 'readyToStart',
  win = 'win',
  lose = 'lose',
  restart = 'restart',
  end = 'end',
}

export type GameStateType =
  | GameStateList.init
  | GameStateList.start
  | GameStateList.readyToStart
  | GameStateList.win
  | GameStateList.lose
  | GameStateList.restart
  | GameStateList.end;

export type GameActionListType = ActionList<GameActionNameType, GameStateType>;

export enum GameAction {
  toStart = 'toStart',
  toRestart = 'toRestart',
  toReadyToStart = 'toReadyToStart',
  toWin = 'toWin',
  toLose = 'toLose',
  toEnd = 'toEnd',
}

export type GameActionNameType =
  | GameAction.toStart
  | GameAction.toRestart
  | GameAction.toWin
  | GameAction.toLose
  | GameAction.toReadyToStart
  | GameAction.toEnd;
