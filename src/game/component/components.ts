import { ObjectPool } from '../../ecs/ObjectPool';
import { World } from '@/ecs/World';
import { CollisionDetected } from './CollisionDetected';
import { Collider } from './Collider';
import { CanMove } from './CanMove';
import { Death } from './Death';
import { DebugFlag } from './DebugFlag';
import { Direction } from './Direction';
import { Food } from './Food';
import { Hunter } from './Hunter';
import { Moved } from './Moved';
import { Movement } from './Movement';
import { MoveTo } from './MoveTo';
import { PlayerInput } from './PlayerInput';
import { Position } from './Position';
import { Render } from './Render';
import { Respawn } from './Respawn';
import { RespawnReady } from './RespawnReady';
import { Snake } from './Snake';
import { SnakeBody } from './SnakeBody';
import { Target } from './Target';
import { Velocity } from './Velocity';
import { Poison } from './Poison';

export interface ComponentMap {
  CollisionDetected: CollisionDetected;
  Collider: Collider;
  CanMove: CanMove;
  Death: Death;
  DebugFlag: DebugFlag;
  Direction: Direction;
  Food: Food;
  Hunter: Hunter;
  Moved: Moved;
  Movement: Movement;
  MoveTo: MoveTo;
  PlayerInput: PlayerInput;
  Position: Position;
  Render: Render;
  Respawn: Respawn;
  RespawnReady: RespawnReady;
  Snake: Snake;
  SnakeBody: SnakeBody;
  Target: Target;
  Velocity: Velocity;
  Poison: Poison;
}

export const registerComponents = (w: World) => {
  w.registerPool(
    CollisionDetected.name,
    new ObjectPool(() => new CollisionDetected(), {
      initialize(item, params) {
        if (params?.opponents?.length) {
          item.opponents.push(...params.opponents);
        }
      },
      deactivate: (item) => {
        item.opponents.length = 0;
      },
      initialSize: 2,
    })
  )
    .registerPool(
      Collider.name,
      new ObjectPool(() => new Collider(), {
        initialize(item, params) {
          if (params?.width) {
            item.width = params.width;
          }

          if (params?.height) {
            item.height = params.height;
          }
        },
        deactivate(item) {
          item.width = 0;
          item.height = 0;
        },
        initialSize: 20,
      })
    )
    .registerPool(CanMove.name, new ObjectPool(() => new CanMove()))
    .registerPool(Death.name, new ObjectPool(() => new Death()))
    .registerPool(
      DebugFlag.name,
      new ObjectPool(() => new DebugFlag(), {
        initialize(item, params) {
          if (params?.isOpen) {
            item.isOpen = params.isOpen;
          }
        },
        deactivate(item) {
          item.isOpen = false;
        },
      })
    )
    .registerPool(
      Direction.name,
      new ObjectPool(() => new Direction(), {
        initialize(item, params) {
          if (params?.x) {
            item.x = params.x;
          }

          if (params?.y) {
            item.y = params.y;
          }
        },
        deactivate(item) {
          item.x = 1;
          item.y = 0;
        },
        initialSize: 1,
      })
    )
    .registerPool(Food.name, new ObjectPool(() => new Food()))
    .registerPool(Hunter.name, new ObjectPool(() => new Hunter()))
    .registerPool(Moved.name, new ObjectPool(() => new Moved()))
    .registerPool(
      Movement.name,
      new ObjectPool(() => new Movement(), {
        initialize(item, params) {
          if (params?.accumulatedTime) {
            item.accumulatedTime = params.accumulatedTime;
          }

          if (params?.moveInterval) {
            item.moveInterval = params.moveInterval;
          }
        },
        deactivate(item) {
          item.accumulatedTime = 0;
          item.moveInterval = 100;
        },
        initialSize: 1,
      })
    )
    .registerPool(
      MoveTo.name,
      new ObjectPool(() => new MoveTo(), {
        initialize(item, params) {
          if (params?.x) {
            item.x = params.x;
          }

          if (params?.y) {
            item.y = params.y;
          }
        },
        deactivate(item) {
          item.x = 0;
          item.y = 0;
        },
        initialSize: 1,
      })
    )
    .registerPool(PlayerInput.name, new ObjectPool(() => new PlayerInput()))
    .registerPool(Poison.name, new ObjectPool(() => new Poison()))
    .registerPool(
      Position.name,
      new ObjectPool(() => new Position(), {
        initialize(item, params) {
          if (params?.x) {
            item.x = params.x;
          }

          if (params?.y) {
            item.y = params.y;
          }
        },
        deactivate(item) {
          item.x = 0;
          item.y = 0;
        },
        initialSize: 10,
      })
    )
    .registerPool(Render.name, new ObjectPool(() => new Render()))
    .registerPool(
      Respawn.name,
      new ObjectPool(() => new Respawn(), {
        initialize(item, params) {
          if (params?.cooldown) {
            item.cooldown = params.cooldown;
          }

          if (params?.elapsed) {
            item.elapsed = params.elapsed;
          }
        },
        deactivate(item) {
          item.cooldown = 3000;
          item.elapsed = 0;
        },
      })
    )
    .registerPool(RespawnReady.name, new ObjectPool(() => new RespawnReady()))
    .registerPool(
      Snake.name,
      new ObjectPool(() => new Snake(), {
        initialize(item, params) {
          if (params?.makeSegments) {
            item.makeSegments = params.makeSegments;
          }

          if (params?.segments?.length) {
            item.segments.push(...params.segments);
          }
        },
        deactivate(item) {
          item.makeSegments = 0;
          item.segments.length = 0;
        },
      })
    )
    .registerPool(SnakeBody.name, new ObjectPool(() => new SnakeBody()))
    .registerPool(
      Target.name,
      new ObjectPool(() => new Target(), {
        deactivate(item) {
          item.targetId = null;
        },
      })
    )
    .registerPool(
      Velocity.name,
      new ObjectPool(() => new Velocity(), {
        initialize(item, params) {
          if (params?.value) {
            item.value = params.value;
          }
        },
        deactivate(item) {
          item.value = 1;
        },
      })
    );
};
