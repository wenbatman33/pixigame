import * as PIXI from 'pixi.js'
import * as config from './_config'
import Sound from './sound'
import I18N from './i18n'

export default class Application extends PIXI.Application {
  constructor(options) {
    super(options)
    PIXI.utils.EventEmitter.call(this)
    window.addEventListener('resize', () => this.autoResize())
    window.addEventListener('orientationchange', () => this.autoResize())
    this.autoResize()
    this.sound = new Sound()
    this.i18n = new I18N()
  }
  autoResize() {
    const viewRect = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }
    const defaultRatio = this.view.width / this.view.height
    const windowRatio = viewRect.width / viewRect.height
    const width = (windowRatio < defaultRatio) ? viewRect.width : (viewRect.height * defaultRatio)
    const height = (windowRatio < defaultRatio) ? (viewRect.width / defaultRatio) : viewRect.height
    const x = viewRect.x + (viewRect.width - width) / 2
    const y = viewRect.y + (viewRect.height - height) / 2
    const APP = document.querySelectorAll('.APP')
    APP.forEach(item => {
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${width}px`
      item.style.height = `${height}px`
    })
  }
  load() {
    let loader = new PIXI.Loader()
    loader.add(this.i18n.defaultJson)
    config.resources.forEach(res => loader.add(res))
    loader
      .on('start', () => { this.emit('loader:start') })
      .on('progress', (loader, res) => { this.emit('loader:progress', parseInt(loader.progress)) })
      .on('load', (loader, res) => {
        console.log(`loader:load ${res.url}`)
        this.emit('load:res', res.url)
      })
      .on('error', (err, loader, res) => { this.emit('loader:error', res.url) })
      .load((loader, res) => {
        app.res = res
        this.i18n.add(res[this.i18n.defaultJson].data)
        this.emit('loader:complete', res)
      })
    return loader
  }
}

Object.assign(Application.prototype, PIXI.utils.EventEmitter.prototype)