import { Container } from 'pixi.js'
import * as config from './_config'
import Application from './app'
import Loading from './loading'
import Scene from './scene'

const layers = {
  scene: new Container(),
  ui: new Container()
}

async function boot() {
  window.app = new Application({
    width: config.width,
    height: config.height,
    view: document.querySelector('#scene'),
    transparent: true
  })
  for (const key in layers) {
    let layer = layers[key]
    app.stage.addChild(layer)
    layer.x = config.width / 2
    layer.y = config.height / 2
  }
}

function loadRes() {
  let promise = new Promise((resolve, reject) => {
    let loading = new Loading()
    layers.ui.addChild(loading)
    app.on('loader:progress', progress => loading.progress = progress)
    app.on('loader:error', error => reject(error))
    app.on('loader:complete', () => {
      resolve()
      loading.destroy()
    })
    app.load()
  })
  return promise
}

function setup() {
  let scene = new Scene()
  layers.scene.addChild(scene)
  // scene.start()
}

window.onload = async () => {
  boot()
  try {
    await loadRes()
  } catch (error) {
    console.log(error)
    return
  }
  setup()
}