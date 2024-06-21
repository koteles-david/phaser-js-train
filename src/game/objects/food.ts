import { Scene, GameObjects } from "phaser";

// HERE: We define the allowed textures for the food
type AllowedTexture = "f1";
type TextureName = "diamond";
const mapping: Record<AllowedTexture, TextureName> = {
  f1: 'diamond'
}

/**
 * This class represents the food that the train will eat to grow.
 * @class Food
 */
export class Food extends GameObjects.Image{
  constructor(scene: Scene, x: number, y: number, texture: AllowedTexture){
    super(scene, x, y, mapping[texture]);
    this.setPosition(x * 50, y * 50);
    this.setOrigin(0);
    scene.children.add(this);
  }
}