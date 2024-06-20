import { Boot } from './scenes/boot';
import { Game } from './scenes/game';
import { GameOver } from './scenes/game-over';
import { MainMenu } from './scenes/main-menu';
import Phaser from 'phaser';
import { Preloader } from './scenes/preloader';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.WEBGL,
    width: 1050,
    height: 850,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

const StartGame = (parent: any) => {

    return new Phaser.Game({ ...config, parent });
}

export default StartGame;