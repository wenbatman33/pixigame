import { Texture, Container, Rectangle } from 'pixi.js'
import Piece from './piece'

const GAP_SIZE = 2
export default class Game extends Container {
  constructor(level, texture) {
    super()
    this.level = level
    this.texture = texture
    this.moveCount = 0
    this.$pieces = new Container()
    this.$pieces.y = 208
    this.$pieces.x = -4
    this.addChild(this.$pieces)

    this.$select = new Container()
    this.$select.y = 208
    this.$select.x = -4
    this.addChild(this.$select)

    this._createPieces()
  }
  /**
   * shuffle, random create the pieces index 
   * index of piece（level=3 3*3 etc.）
   * 0  1  2
   * 3  4  5
   * 6  7  8
   * suffle will return [3,8,6,2,5,1,4,0,7] etc.
   */
  _shuffle() {

    let index = -1
    let length = this.level * this.level
    const lastIndex = length - 1

    const result = Array.from({
      length
    }, (v, i) => i)

    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result
  }
  _createPieces() {
    this.piece_width = this.texture.orig.width / this.level
    this.piece_height = this.texture.orig.height / this.level

    let offset_x = this.texture.orig.width / 2
    let offset_y = this.texture.orig.height / 2

    let shuffled_index = this._shuffle()

    for (let ii = 0; ii < shuffled_index.length; ii++) {
      //pick a piece from the big texture indicated by suffled indexes.
      let frame_row = parseInt(shuffled_index[ii] / this.level)
      let frame_col = shuffled_index[ii] % this.level
      let frame = new Rectangle(frame_col * this.piece_width, frame_row * this.piece_height, this.piece_width, this.piece_height)
      let piece = new Piece(new Texture(this.texture, frame), ii, shuffled_index[ii])

      let row = parseInt(ii / this.level)
      let col = ii % this.level
      piece.x = col * this.piece_width - offset_x + GAP_SIZE * col
      piece.y = row * this.piece_height - offset_y + GAP_SIZE * row
      piece
        .on('dragstart', (picked) => {
          this.$pieces.removeChild(picked)
          this.$select.addChild(picked)
        })
        .on('dragmove', (picked) => {
          this._checkHover(picked)
        })
        .on('dragend', (picked) => {
          this.$select.removeChild(picked)
          this.$pieces.addChild(picked)
          let target = this._checkHover(picked)
          if (target) {
            this.moveCount++
            this._swap(picked, target)
            target.tint = 0xFFFFFF
          } else {
            picked.x = picked.origin_x
            picked.y = picked.origin_y
          }
        })
      this.$pieces.addChild(piece)
    }
  }

  _swap(picked, target) {
    let pickedIndex = picked.currentIndex
    picked.x = target.x
    picked.y = target.y
    picked.currentIndex = target.currentIndex

    target.x = picked.origin_x
    target.y = picked.origin_y
    target.currentIndex = pickedIndex
  }

  get success() {
    let success = this.$pieces.children.every(piece => piece.currentIndex == piece.targetIndex)
    if (success) {
      console.log('success', this.moveCount)
    }
    return success
  }
  _checkHover(picked) {
    let overlap = this.$pieces.children.find(piece => {
      //the center position of the piece is in the other pieces boundry
      let rect = new Rectangle(piece.x, piece.y, piece.width, piece.height)
      return rect.contains(picked.center.x, picked.center.y)
    })
    this.$pieces.children.forEach(piece => piece.tint = 0xFFFFFF)
    if (overlap) {
      overlap.tint = 0x00ffff
    }

    return overlap
  }
  // createBack() {
  //   const graphics = new Graphics()
  //   this.$pieces.children.forEach(piece => {
  //     graphics.lineStyle(2, 0xFEEB77, 1)
  //     graphics.beginFill(0x650a5A)
  //     graphics.drawRect(piece.x, piece.y, piece.width, piece.height)
  //     graphics.endFill()
  //     this.back.addChild(graphics)
  //   })
  // }
}