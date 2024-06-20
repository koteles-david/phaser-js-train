import Food from "./Food";
import { Wall } from "../objects/wall";
import { Gate } from "../objects/gate";

export const UP = 0;
export const DOWN = 1;
export const LEFT = 2; 
export const RIGHT = 3;

export class Train {
  alive: boolean = true;
  updated: any;
  moveTime: any;
  head: any;
  tail: any;
  direction: number = RIGHT;
  heading: number;
  speed: any;
  headPosition: Phaser.Geom.Point;
  body: Phaser.GameObjects.Group;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.body = scene.add.group();
    this.head = this.body.create(x * 50, y * 50, 'train');
    this.head.setOrigin(0);

    this.alive = true
    this.speed = 450;
    this.moveTime = 1;

    this.tail = new Phaser.Geom.Point(x, y);

    this.direction = RIGHT;
    this.heading = RIGHT;
  }

  move(time: number) {
    switch (this.heading) {
      case LEFT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 21);
        break;
      case RIGHT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 21);
        break;
      case UP:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 12);
        break;
      case DOWN:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 12);
        break;
    }

    this.direction = this.heading;

    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * 50,
      this.headPosition.y * 50,
      1,
      this.tail
    );

    let hitBody = Phaser.Actions.GetFirst(
      this.body.getChildren(),
      { x: this.head.x, y: this.head.y },
      1
    );
    if (hitBody) {
      this.alive = false;
      return false
    } else {
      this.moveTime = time + this.speed;
      return true;
    }
  }

  update(time: number) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  faceLeft(): void {
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = LEFT;
      this.head.setTexture('train').setAngle(0);
      this.head.flipX = true;
    }
}


faceRight(): void {
  if (this.direction === UP || this.direction === DOWN) {
    this.heading = RIGHT;
    this.head.setTexture('train').setAngle(0);
    this.head.flipX = false
  }
}


faceUp(): void {
  if (this.direction === LEFT || this.direction === RIGHT) {
    this.heading = UP;
    this.head.setAngle(0);
    this.head.flipX = false
    this.head.setAngle(-90);
  }
}


  faceDown(): void {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = DOWN;
      this.head.setAngle(0);
      this.head.flipX = false
      this.head.setAngle(90);
    }
  }

  collideWithFood(food: Food[]) {
    for (let i = 0; i < food.length; i++) {
      if (food[i].x === this.head.x && food[i].y === this.head.y) {
        return i;
      }
    }
    return false;
  }

  collisionWithWall(wall: Wall[]) {
    for (let i = 0; i < wall.length; i++) {
      if (wall[i].x === this.head.x && wall[i].y === this.head.y) {
        return {
          x: wall[i].x,
          y: wall[i].y,
          i
        };
      }
    }
    return undefined;
  }

  collisionWithGate(gate: Gate | undefined) {
    if (gate?.x === this.head.x && gate?.y === this.head.y) {
      if (gate?.isOpen === true) {
        return {
          gateOpened: true,
          value: true
        }
      }

      return {
        gateOpened: false,
        value: true
      };
      
    }
    return {
      gateOpened: false,
      value: false
    };;
  }

  die() {
    this.alive = false;
    this.head.setTexture('train_destroyed');
    switch (this.heading) {
      case LEFT:
        this.head.x += 50;
        break;
      case RIGHT:
        this.head.x -= 50;
        break;
      case UP:
        this.head.y += 50;
        break;
      case DOWN:
        this.head.y -= 50;
        break;
    }
  }

  resetTrain() {
    this.alive = true;
    this.head.setTexture('train');
    this.head.x = this.headPosition.x * 50;
    this.head.y = this.headPosition.y * 50;
    this.body.clear(true, true);
  }
}