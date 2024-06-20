import { Scene, GameObjects } from "phaser";

export class Wall extends GameObjects.Image{
  constructor(scene: Scene, x: number, y: number){
    super(scene, x, y, 'wall');
    this.setPosition(x * 50, y * 50);
    this.setOrigin(0);
    scene.children.add(this);
  }
}