import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { Snake } from '../component/Snake';
import { RenderEvents } from './events/render';
import { GridManager } from '../GridManager';
import { createSnakeBody } from '../entities/snakeBody';
import { Vector2 } from '../geometry/vector2';
import { EntityId } from '@/ecs/Entity';
import { SnakeBody } from '../component/SnakeBody';

export class SnakeMovementSystem implements ISystem {
  public entities = this.w.newGroup(['Snake', 'Position', 'MoveTo']);

  constructor(
    public w: World,
    private _grid: GridManager,
    private _gridSize: number
  ) {}

  private moveSegmentToHead(
    snake: Snake,
    snakeBody: SnakeBody,
    prevPosition: Vector2
  ) {
    if (!snake.tail) return;

    const tail = snake.tail;
    const tailPosition = this.w.getComponent(tail, 'Position');

    if (tail !== snakeBody.prev) {
      const prevSegment = this.w.getComponent(snakeBody.prev!, 'SnakeBody');
      const tailSegment = this.w.getComponent(tail, 'SnakeBody');
      const nextSegment = this.w.getComponent(tailSegment.next!, 'SnakeBody');

      nextSegment.prev = null;
      snake.tail = tailSegment.next;

      tailSegment.next = snakeBody.head;
      tailSegment.prev = snakeBody.prev;

      snakeBody.prev = tail;
      prevSegment.next = tail;
    }

    this.w.messageBroker.publish(
      RenderEvents.CLEAN_RENDER,
      vectorUtils.copy(tailPosition)
    );

    this._grid.moveEntity(tail, prevPosition);
    vectorUtils.setVector(tailPosition, prevPosition);

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, tail);
  }

  private addNewSegment(
    entity: EntityId,
    snake: Snake,
    snakeBody: SnakeBody,
    prevPosition: Vector2
  ) {
    const next = snake.tail || entity;

    const newSegment = createSnakeBody(
      this.w,
      this._gridSize,
      prevPosition,
      entity,
      next
    );

    if (!snakeBody.prev) {
      snakeBody.prev = newSegment;
    }

    if (snake.tail) {
      const tailSegment = this.w.getComponent(snake.tail, 'SnakeBody');

      tailSegment.prev = newSegment;
    }

    snake.tail = newSegment;

    this._grid.addEntity(
      newSegment,
      this.w.getComponent(newSegment, 'Position')
    );

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, newSegment);
  }

  private removeLastSegment(snake: Snake, snakeBody: SnakeBody) {
    if (!snake.tail) return;

    if (snake.tail === snakeBody.prev) {
      snake.tail = null;
      snakeBody.prev = null;
    } else {
      const tailSegment = this.w.getComponent(snake.tail, 'SnakeBody');
      const nextSegment = this.w.getComponent(tailSegment.next!, 'SnakeBody');

      nextSegment.prev = null;
      snake.tail = nextSegment.next;
    }

    this.w.getComponent(snake.tail!, 'Death');
    const lastPosition = this.w.getComponent(snake.tail!, 'Position');

    this.w.messageBroker.publish(
      RenderEvents.CLEAN_RENDER,
      vectorUtils.copy(lastPosition)
    );
  }

  public update(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      const snake = this.w.getComponent(entity, 'Snake');
      const snakeBody = this.w.getComponent(entity, 'SnakeBody');
      const position = this.w.getComponent(entity, 'Position');

      const prevPosition = vectorUtils.copy(position);

      if (snake.makeSegments === 0 && !snake.segments) continue;

      if (snake.makeSegments > 0) {
        snake.segments++;
        this.addNewSegment(entity, snake, snakeBody, prevPosition);
        snake.makeSegments -= 1;
      } else {
        this.moveSegmentToHead(snake, snakeBody, prevPosition);
      }

      if (snake.makeSegments < 0) {
        snake.segments--;
        this.removeLastSegment(snake, snakeBody);
        snake.makeSegments += 1;
      }
    }
  }
}
