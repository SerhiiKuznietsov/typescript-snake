import {
  GameAction,
  GameActionNameType,
  GameStateList,
  GameStateType,
} from './type/type';
import { StateController } from './stateController';
import { GameState } from './state/game';

export class GameStateController extends StateController<
  GameStateType,
  GameActionNameType
> {
  constructor() {
    super(GameStateList.init, [
      new GameState(GameStateList.init, [
        [GameAction.toReadyToStart, GameStateList.readyToStart],
      ]),
      new GameState(GameStateList.readyToStart, [
        [GameAction.toStart, GameStateList.start],
        [GameAction.toRestart, GameStateList.restart],
      ]),
      new GameState(GameStateList.start, [
        [GameAction.toRestart, GameStateList.restart],
        [GameAction.toWin, GameStateList.win],
        [GameAction.toLose, GameStateList.lose],
      ]),
      new GameState(GameStateList.restart, [
        [GameAction.toReadyToStart, GameStateList.readyToStart],
      ]),
      new GameState(GameStateList.win, [[GameAction.toEnd, GameStateList.end]]),
      new GameState(GameStateList.lose, [
        [GameAction.toEnd, GameStateList.end],
      ]),
      new GameState(GameStateList.end, [
        [GameAction.toRestart, GameStateList.restart],
      ]),
    ]);
  }
}
