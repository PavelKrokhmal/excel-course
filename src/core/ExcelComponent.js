import { DomListener } from '@core/DomListener'

/**
 * ExcelComponent
 */
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.subscribe = options.subscribe || []
    this.storeSub = null

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
    this.storeSub.unsubscribe()
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {
  }

  // Уведомляем слушателей про события
  $emit(event, ...arg) {
    const unsub = this.emitter.emit(event, ...arg)
    this.unsubscribers.push(unsub)
  }

  // Подписка на события
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }
}
