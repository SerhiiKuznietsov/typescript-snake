import { GameObject } from '../object/gameObject';
import { Field } from './filed';

export class Scene {
  private _field = new Field();
  private _list: GameObject[] = [];

  public add(gameObject: GameObject): void {
    this._list.push(gameObject);
  }

  public remove(gameObject: GameObject): void {
    this._list.filter((item) => item !== gameObject);
  }

  public draw(): void {

  }
}