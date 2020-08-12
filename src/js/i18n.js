import mustache from 'mustache'

const jsonList = {
  'zh-cn': 'assets/i18n/zh-cn.json',
  'en': 'assets/i18n/en.json',
}
export default class I18N {
  constructor() {
    this.defaultLanguage = 'en'
    this.words = {}
  }
  add(words) {
    Object.assign(this.words, words)
  }
  set setDefaultLanguage(lang) {
    this.defaultLanguage = lang
  }
  get defaultJson() {
    return jsonList[this.defaultLanguage]
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