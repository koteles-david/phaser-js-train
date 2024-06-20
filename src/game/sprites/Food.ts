import { Scene, GameObjects } from "phaser";

export default class Food extends GameObjects.Image{
  total: number;

  constructor(scene: Scene, x: number, y: number){
    super(scene, x, y, 'diamond');
    this.setPosition(x * 50, y * 50);
    this.setOrigin(0);
    this.total = 0;
    scene.children.add(this);
  }

  eat () {
    this.total++;
  }
}