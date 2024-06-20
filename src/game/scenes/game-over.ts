import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
  constructor () {
    super('GameOver');
  }

  create () {
    this.cameras.main.setBackgroundColor(0xff0000);

    this.add.text(512, 384, 'You win', {
      fontFamily: 'Arial Black', fontSize: 64, color: 'green',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5).setDepth(100);

    EventBus.emit('current-scene-ready', this);
  }

  changeScene () {
    this.scene.start('Game');
  }
}