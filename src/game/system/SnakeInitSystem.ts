import { World } from '@/ecs/World';
import { PlayerInput } from '../component/PlayerInput';
import { Snake } from '../component/Snake';
import { Position } from '../component/Position';
import { Movement } from '../component/Movement';
import { Velocity } from '../component/Velocity';
import { Direction } from '../component/Direction';
import { Collider } from '../component/Collider';
import { CollisionOpponent } from '../component/CollisionOpponent';
import { Render } from '../component/Render';
import { Square } from '../geometry/shape/square';
import { DebugFlag } from '../component/DebugFlag';
import { ISystem, SystemRegistry } from '@/ecs/SystemRegistry';

export class SnakeInitSystem implements ISystem {
  constructor(
    public w: World,
    private systems: SystemRegistry,
    private gridSize: number
  ) {}

  public awake(): void {
    const entityId = this.w.createEntity();

    this.w.getComponent(entityId, PlayerInput);
    this.w.getComponent(entityId, Snake);
    this.w.getComponent(entityId, Position, 0, 0);
    this.w.getComponent(entityId, Movement, 1);
    this.w.getComponent(entityId, Velocity, 1);
    this.w.getComponent(entityId, Direction);
    this.w.getComponent(entityId, Collider);
    this.w.getComponent(entityId, CollisionOpponent);

    const render = this.w.getComponent(entityId, Render);
    render.shape = new Square(this.gridSize);
    render.color = '#1fa224';
    render.zIndex = 3;

    this.w.getComponent(entityId, DebugFlag);

    this.systems.removeSystem(this);
  }

  public update(): void {}
}
