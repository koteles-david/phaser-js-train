import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Train } from '../sprites/Train';
import Food from '../sprites/Food';
import { Wall } from '../objects/wall';
import { Gate } from '../objects/gate';

import { level1, foodNumber } from '../level/level1';

export class Game extends Scene {
  private wall: Wall[];
  private gate?: Gate;
  private train?: Train;
  private food: Food[];

  private eatenMeals: number = 0;
  cursors: any;
  constructor () {
    super('Game');

    this.food = [];
    this.wall = [];
  }

  create (){
    this.cameras.main.setBackgroundColor("black");
    this.cursors = this.input?.keyboard?.createCursorKeys();

    this.levelFillup();
  
    EventBus.emit('current-scene-ready', this);
  }

  levelFillup() {
    for (let i = 0; i < level1.length; i++) {
      for (let j = 0; j < level1[i].length; j++) {
        if (level1[i][j] === 'w') {
          this.wall.push(new Wall(this, j, i))
        }

        if (level1[i][j] === 'f1') {
          this.food.push(new Food(this, j, i))
        }

        if (level1[i][j] === 'g') {
          this.gate = new Gate(this, j, i)
        }

        if (level1[i][j] === 't') {
          this.train = new Train(this, j, i)
        }
      }
    }
  }

  update(time: number) {
    if (!this.train?.alive) {
      if (this.cursors.left.isDown ||
        this.cursors.right.isDown ||
        this.cursors.up.isDown ||
        this.cursors.down.isDown) {
        this.scene.restart();
        this.levelFillup();
      }
      return
    }

    if (this.cursors.left.isDown) {
      this.train.faceLeft();
    } else if (this.cursors.right.isDown) {
      this.train.faceRight();
    } else if (this.cursors.up.isDown) {
      this.train.faceUp();
    } else if (this.cursors.down.isDown) {
      this.train.faceDown();
    }

    this.train.update(time);

    const collidedWall = this.train.collisionWithWall(this.wall)
    if (collidedWall !== undefined) {
      this.train.die();
      this.eatenMeals = 0;
    }

    const collidedFood = this.train.collideWithFood(this.food)
    if (collidedFood !== false) {
      this.food[collidedFood].destroy();
      this.food.splice(collidedFood, 1);
      this.eatenMeals += 1;

      if (this.eatenMeals === foodNumber) {
        this.gate?.open();
      }
    }

    const collidedGate = this.train.collisionWithGate(this.gate)
    if (collidedGate.gateOpened===true && collidedGate.value===true) {
      this.changeScene();
    } else {
      if (collidedGate.gateOpened===true && collidedGate.value===false) {
        this.train.die();
        this.eatenMeals = 0;
      }
    }

}
  

  changeScene () {
    this.scene.start('GameOver');
  }
}