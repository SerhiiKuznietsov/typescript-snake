import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { PrevPosition } from '../component/PrevPosition';
import { Position } from '../component/Position';
import { Snake } from '../component/Snake';
import { RenderEvents } from './events/render';
import { GridManager } from '../GridManager';
import { createSnakeBody } from '../entities/snakeBody';
import { Death } from '../component/Death';
import { EntityId } from '@/ecs/Entity';

export class SnakeMovementSystem implements ISystem {
  public entities = this.w.newGroup([Snake, Position, PrevPosition]);

  constructor(
    public w: World,
    private _grid: GridManager,
    private _gridSize: number
  ) {}

  private addSegments(entity: EntityId) {
    const prevPosition = this.w.getComponent(entity, PrevPosition);
    const { segments } = this.w.getComponent(entity, Snake);

    const newSnakeBody = createSnakeBody(this.w, this._gridSize);

    segments.unshift(newSnakeBody);

    vectorUtils.setVector(
      this.w.getComponent(newSnakeBody, Position),
      prevPosition
    );

    this._grid.addEntity(
      newSnakeBody,
      this.w.getComponent(newSnakeBody, Position)
    );

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, newSnakeBody);
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const snake = this.w.getComponent(entity, Snake);

      if (snake.makeSegments === 0 && !snake.segments.length) return;

      if (snake.makeSegments < 1 && snake.segments.length) {
        this.w.getComponent(snake.segments.pop()!, Death);
      }

      if (snake.makeSegments < 0) {
        this.w.getComponent(snake.segments.pop()!, Death);
        snake.makeSegments += 1;
      }

      if (snake.makeSegments > 0) {
        snake.makeSegments -= 1;
      }

      this.addSegments(entity);
    });
  }
}
