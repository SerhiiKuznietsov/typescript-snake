import { ISystem } from '@/ecs/SystemRegistry';
import { World } from '@/ecs/World';
import { vectorUtils } from '../geometry/utils/vectorUtils';
import { PrevPosition } from '../component/PrevPosition';
import { Position } from '../component/Position';
import { Snake } from '../component/Snake';
import { RenderEvents } from './events/render';
import { GridManager } from '../GridManager';
import { createSnakeBody } from '../entities/snakeBody';
import { EntityId } from '@/ecs/Entity';
import { Death } from '../component/Death';

export class SnakeMovementSystem implements ISystem {
  public entities = this.w.newGroup([Snake, Position, PrevPosition]);

  constructor(
    public w: World,
    private _grid: GridManager,
    private _gridSize: number
  ) {}

  private moveSegmentToHead(entity: EntityId, snake: Snake) {
    const lastSegment = snake.segments.pop();

    if (!lastSegment) return;

    const prevPosition = this.w.getComponent(entity, PrevPosition);
    const lastPosition = this.w.getComponent(lastSegment, Position);

    this.w.messageBroker.publish(
      RenderEvents.CLEAN_RENDER,
      vectorUtils.copy(lastPosition)
    );

    this._grid.moveEntity(lastSegment, lastPosition, prevPosition);
    vectorUtils.setVector(lastPosition, prevPosition);

    snake.segments.unshift(lastSegment);

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, lastSegment);
  }

  private addNewSegment(entity: EntityId, snake: Snake) {
    const prevPosition = this.w.getComponent(entity, PrevPosition);

    const newSegment = createSnakeBody(this.w, this._gridSize);
    snake.segments.unshift(newSegment);

    vectorUtils.setVector(
      this.w.getComponent(newSegment, Position),
      prevPosition
    );

    this._grid.addEntity(newSegment, this.w.getComponent(newSegment, Position));

    this.w.messageBroker.publish(RenderEvents.NEW_RENDER, newSegment);
  }

  private removeLastSegment(snake: Snake) {
    const lastSegment = snake.segments.pop();
    if (!lastSegment) return;

    this.w.getComponent(lastSegment, Death);
    const lastPosition = this.w.getComponent(lastSegment, Position);

    this.w.messageBroker.publish(
      RenderEvents.CLEAN_RENDER,
      vectorUtils.copy(lastPosition)
    );
  }

  public update(): void {
    this.entities.forEach((entity) => {
      const snake = this.w.getComponent(entity, Snake);

      if (snake.makeSegments === 0 && !snake.segments.length) return;

      if (snake.makeSegments > 0) {
        this.addNewSegment(entity, snake);
        snake.makeSegments -= 1;
      } else if (snake.makeSegments < 0) {
        this.removeLastSegment(snake);
        snake.makeSegments += 1;
      } else {
        this.moveSegmentToHead(entity, snake);
      }
    });
  }
}
