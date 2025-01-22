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
import { CollisionHandler } from './CollisionHandler';
import { Attacker } from './Attacker';
import { Hunts } from './Hunts';

// TODO - We need to remove the hardwiring of this interface. It is possible to pass it when creating a world

export interface ComponentMap {
  CollisionHandler: CollisionHandler;
  CollisionDetected: CollisionDetected;
  Collider: Collider;
  CanMove: CanMove;
  Death: Death;
  DebugFlag: DebugFlag;
  Direction: Direction;
  Food: Food;
  Hunter: Hunter;
  Hunts: Hunts;
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
  Attacker: Attacker;
}

export const registerComponents = (w: World) => {
  w.registerPool('Attacker', new ObjectPool(() => new Attacker()));

  w.registerPool(
    'CollisionHandler',
    new ObjectPool(() => new CollisionHandler())
  );
  w.registerPool(
    'CollisionDetected',
    new ObjectPool(() => new CollisionDetected(), {
      initialize(item, params) {
        if (params?.target) {
          item.target = params.target;
        }
      },
      deactivate: (item) => {
        item.target = 0;
      },
      initialSize: 2,
    })
  )
    .registerPool(
      'Collider',
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
    .registerPool('CanMove', new ObjectPool(() => new CanMove()))
    .registerPool('Death', new ObjectPool(() => new Death()))
    .registerPool(
      'DebugFlag',
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
      'Direction',
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
    .registerPool('Food', new ObjectPool(() => new Food()))
    .registerPool('Hunter', new ObjectPool(() => new Hunter()))
    .registerPool(
      'Hunts',
      new ObjectPool(() => new Hunts(), {
        initialize(item, params) {
          if (params?.target) {
            item.target = params.target;
          }
        },
        deactivate(item) {
          item.target = null;
        },
      })
    )
    .registerPool('Moved', new ObjectPool(() => new Moved()))
    .registerPool(
      'Movement',
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
      'MoveTo',
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
    .registerPool(
      'PlayerInput',
      new ObjectPool(() => new PlayerInput(), {
        initialize(item, params) {
          if (params?.up) {
            item.up = params.up;
          }

          if (params?.down) {
            item.down = params.down;
          }

          if (params?.left) {
            item.left = params.left;
          }

          if (params?.right) {
            item.right = params.right;
          }
        },
        deactivate(item) {
          item.up = item.down = item.left = item.right = false;
        },
      })
    )
    .registerPool('Poison', new ObjectPool(() => new Poison()))
    .registerPool(
      'Position',
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
    .registerPool(
      'Render',
      new ObjectPool(() => new Render(), {
        initialize(item, params) {
          if (params?.color) {
            item.color = params.color;
          }

          if (params?.shape) {
            item.shape = params.shape;
          }

          if (params?.zIndex) {
            item.zIndex = params.zIndex;
          }
        },
        deactivate(item) {
          item.color = '#000';
          item.zIndex = 0;
        },
      })
    )
    .registerPool(
      'Respawn',
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
    .registerPool('RespawnReady', new ObjectPool(() => new RespawnReady()))
    .registerPool(
      'Snake',
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
    .registerPool('SnakeBody', new ObjectPool(() => new SnakeBody()))
    .registerPool(
      'Target',
      new ObjectPool(() => new Target(), {
        initialize(item, params) {
          if (params?.targetId) {
            item.targetId = params.targetId;
          }
        },
        deactivate(item) {
          item.targetId = null;
        },
      })
    )
    .registerPool(
      'Velocity',
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
