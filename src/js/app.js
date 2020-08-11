import * as PIXI from 'pixi.js'
import Sound from './sound'
import I18N from './i18n'
import * as config from './config'

export default class Application extends PIXI.Application {
  constructor(options) {
    options.resizeTo = undefined
    super(options)
    PIXI.utils.EventEmitter.call(this)
    this.viewRect = config.viewRect
    window.addEventListener('resize', () => this.autoResize(this.viewRect))
    window.addEventListener('orientationchange', () => this.autoResize(this.viewRect))

    this.autoResize(this.viewRect)
    this.sound = new Sound()
    this.i18n = new I18N(config.i18n)
  }
  autoResize() {
    let viewRect = Object.assign({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }, this.viewRect)

    const defaultRatio = this.view.width / this.view.height
    const windowRatio = viewRect.width / viewRect.height

    let width
    let height

    if (windowRatio < defaultRatio) {
      width = viewRect.width
      height = viewRect.width / defaultRatio
    } else {
      height = viewRect.height
      width = viewRect.height * defaultRatio
    }

    let x = viewRect.x + (viewRect.width - width) / 2
    let y = viewRect.y + (viewRect.height - height) / 2

    let autofitItems = document.querySelectorAll('.autofit')
    autofitItems.forEach(item => {
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${width}px`
      item.style.height = `${height}px`
    })
  }
  load() {
    let loader = new PIXI.Loader()
    loader.defaultQueryString = `v=${config.version}`
    console.log(`v=${config.version}`)
    loader.add(this.i18n.file)
    config.resources.forEach(res => {
      if (res.i18n) {
        loader.add({
          name: res.name,
          url: res.i18n[this.i18n.language]
        })
      } else {
        loader.add(res)
      }
    })

    loader
      .on('start', () => {
        this.emit('loader:start')
      })
      .on('progress', (loader, res) => {
        this.emit('loader:progress', parseInt(loader.progress))
      })
      .on('load', (loader, res) => {
        console.log(`loader:load ${res.url}`)
        this.emit('load:res', res.url)
      })
      .on('error', (err, loader, res) => {
        // console.warn(err)
        this.emit('loader:error', res.url)
      })
      .load((loader, res) => {
        // console.log('loader:complete')
        app.res = res
        this.i18n.add(res[this.i18n.file].data)
        delete res[this.i18n.file]
        this.emit('loader:complete', res)
      })

    return loader
  }
}

Object.assign(Application.prototype, PIXI.utils.EventEmitter.prototype)