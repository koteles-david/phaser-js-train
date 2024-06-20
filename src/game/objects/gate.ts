import { Scene, GameObjects } from "phaser";

export class Gate extends GameObjects.Image{
  public isOpen: boolean = false;
  constructor(scene: Scene, x: number, y: number){
    super(scene, x, y, 'gate');
    this.setPosition(x * 50, y * 50);
    this.setOrigin(0);
    scene.children.add(this);
  }

  open() {
    this.setTexture('gateOpened');
    this.isOpen = true;
  }
}