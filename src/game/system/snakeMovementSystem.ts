import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { Snake } from '../component/Snake';
import { RenderEvents } from './events/render';
import { GridManager } from '../GridManager';
import { createSnakeBody } from '../entities/snakeBody';
import { Vector2 } from '../geometry/vector2';

export class SnakeMovementSystem implements ISystem {
  public entities = this.w.newGroup(['Snake', 'Position', 'MoveTo']);

  constructor(
    public w: World,
    private _grid: GridManager,
    private _gridSize: number
  ) {}

  private moveSegmentToHead(snake: Snake, prevPosition: Vector2) {
    const lastSegment = snake.segments.pop();

    if (!lastSegment) return;

    const lastPosition = this.w.getComponent(lastSegment, 'Position');

    this.w.messageBroker.publish(
      RenderEvents.CLEAN_RENDER,
      vectorUtils.copy(lastPosition)
    );

    this._grid.moveEntity(lastSegment, lastPosition, prevPosition);
    vectorUtils.setVector(lastPosition, prevPosition);

    snake.segments.unshift(lastSegment);

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, lastSegment);
  }

  private addNewSegment(snake: Snake, prevPosition: Vector2) {
    const newSegment = createSnakeBody(this.w, this._gridSize);
    snake.segments.unshift(newSegment);

    vectorUtils.setVector(
      this.w.getComponent(newSegment, 'Position'),
      prevPosition
    );

    this._grid.addEntity(
      newSegment,
      this.w.getComponent(newSegment, 'Position')
    );

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, newSegment);
  }

  private removeLastSegment(snake: Snake) {
    const lastSegment = snake.segments.pop();
    if (!lastSegment) return;

    this.w.getComponent(lastSegment, 'Death');
    const lastPosition = this.w.getComponent(lastSegment, 'Position');

    this.w.messageBroker.publish(
      RenderEvents.CLEAN_RENDER,
      vectorUtils.copy(lastPosition)
    );
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const snake = this.w.getComponent(entity, 'Snake');
      const position = this.w.getComponent(entity, 'Position');

      const prevPosition = vectorUtils.copy(position);

      if (snake.makeSegments === 0 && !snake.segments.length) return;

      if (snake.makeSegments > 0) {
        this.addNewSegment(snake, prevPosition);
        snake.makeSegments -= 1;
      } else {
        this.moveSegmentToHead(snake, prevPosition);
      }

      if (snake.makeSegments < 0) {
        this.removeLastSegment(snake);
        snake.makeSegments += 1;
      }
    });
  }
}
