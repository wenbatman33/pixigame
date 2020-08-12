import { Sprite, utils } from 'pixi.js'

export default class Piece extends Sprite {
  constructor(texture, currentIndex, targetIndex) {
    super(texture)
    utils.EventEmitter.call(this)
    this.currentIndex = currentIndex
    this.targetIndex = targetIndex
    this.interactive = true
    this
      .on('pointerdown', this._onDragStart)
      .on('pointermove', this._onDragMove)
      .on('pointerup', this._onDragEnd)
      .on('pointerupoutside', this._onDragEnd)
  }
  _onDragStart(event) {
    this.dragging = true
    this.data = event.data
    this.alpha = 0.5
    let pointer_pos = this.data.getLocalPosition(this.parent)
    this.offset_x = pointer_pos.x - this.x
    this.offset_y = pointer_pos.y - this.y
    this.origin_x = this.x
    this.origin_y = this.y
    this.emit('dragstart', this)
  }

  _onDragMove() {
    if (this.dragging) {
      const pos = this.data.getLocalPosition(this.parent)
      this.x = pos.x - this.offset_x
      this.y = pos.y - this.offset_y
      this.emit('dragmove', this)
    }
  }

  /**
   * drop
   */
  _onDragEnd() {
    if (this.dragging) {
      this.dragging = false
      this.alpha = 1
      this.data = null
      this.emit('dragend', this)
    }
  }

  /**
   * center postion of the piece
   */
  get center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    }
  }
}

Object.assign(Piece.prototype, utils.EventEmitter.prototype)