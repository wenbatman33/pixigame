import { TextStyle, Container, Sprite, Text } from 'pixi.js'
import Game from './game'
import Result from './result'

const STYLE_WHITE = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 46,
  fontWeight: 'bold',
  fill: '#ffffff',
})
// 倒計時
const TOTAL_TIME = 20
//time countdown
let _countdown = TOTAL_TIME
export default class Scene extends Container {
  constructor() {
    super()
    let stageBg = new Sprite(app.res.stageBg.texture)
    stageBg.anchor.set(0.5)
    this.addChild(stageBg)
    let idol = new Sprite(app.res.main.textures.puzzle)
    idol.y = -198
    idol.x = -165
    idol.anchor.set(0.5)
    idol.scale.set(0.37)
    this.addChild(idol)
    this.$time = new Text(_countdown + '″', STYLE_WHITE)
    this.$time.anchor.set(0.5)
    this.$time.x = 170
    this.$time.y = -156
    this.addChild(this.$time)
    this.$Game = new Game(3, app.res.main.textures.puzzle)
    this.addChild(this.$Game)
  }

  start() {
    let result = new Result()
    this.addChild(result)
    app.sound.play('sound_bg', true)
    let timer = setInterval(() => {
      if (this.$Game.success) {
        clearInterval(timer)
        app.sound.stop('sound_bg')
        app.sound.play('sound_win')
        result.win()
      } else {
        _countdown -= 1
        this.$time.text = _countdown + '″'
        if (_countdown == 0) {
          clearInterval(timer)
          app.sound.stop('sound_bg')
          app.sound.play('sound_fail')
          result.fail()
        }
      }
    }, 1000)
  }
}