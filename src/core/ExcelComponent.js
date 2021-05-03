import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.subscribe = options.subscribe || []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {
  }

  // Уведомляем слушателей про события
  $emit(event, ...arg) {
    this.emitter.emit(event, ...arg)
  }

  // Подписка на события
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }
}
