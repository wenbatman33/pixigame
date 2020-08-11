import { parseQueryString } from './util'
import mustache from 'mustache'


export default class I18N {
  constructor(config) {
    this.config = config
    this.words = {}
  }

  add(words) {
    Object.assign(this.words, words)
  }

  get language() {
    let lang = parseQueryString().lang
    let languages = Object.keys(this.config)
    if (lang && languages.indexOf(lang) !== -1) {
      return lang
    }
    lang = window.navigator.userLanguage || window.navigator.language
    if (lang && languages.indexOf(lang) !== -1) {
      return lang
    }
    return 'zh-cn'
  }

  get file() {
    let uri = this.config[this.language]
    return uri
  }
  get(key, options) {
    let text = this.words[key]
    if (text) {
      if (options) {
        console.log(mustache.render(text, options))
        return mustache.render(text, options)
      }
      return text
    } else {
      console.warn('can not find key:' + key)
      return ''
    }
  }
}