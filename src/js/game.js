import { Texture, Container, Rectangle, AnimatedSprite } from 'pixi.js'
import Piece from './piece'

const GAP_SIZE = 2
export default class Game extends Container {
  constructor() {
    super()
    const idle_sheet = app.res.idle.spritesheet;
    const ken_idle = new AnimatedSprite(idle_sheet.animations.idle);

    ken_idle.animationSpeed = 0.1;
    ken_idle.anchor.set(0.5, 1);
    ken_idle.x = 0;
    ken_idle.y = 500;
    ken_idle.scale.x = 5;
    ken_idle.scale.y = 5;
    ken_idle.play();
    ken_idle.interactive = true;
    // ken_idle.once('click', this.clickHandle)
    this.addChild(ken_idle);
  }
}