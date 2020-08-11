import sound from 'pixi-sound'

export default class Sound {
  constructor() {}
  play(name, loop) {
    if (typeof loop !== 'boolean') {
      loop = false
    }
    let sound = app.res[name].sound
    sound.loop = loop
    sound.volume = 0.05
    // return sound.play()
    return sound.stop()
  }

  stop(name) {
    app.res[name].sound.stop()
  }
  toggleMuteAll() {
    sound.toggleMuteAll()
  }
}