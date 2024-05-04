import { Vector2 } from '../geometry/vector2';
import { Location } from './location';

export class Body {
  public segments: Location[] = [];

  public grow(position: Vector2): void {
    this.segments.push(new Location(position));
  }
}
