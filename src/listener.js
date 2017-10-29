export default class Listener {
  constructor (callback, count) {
    this.callback = callback
    this.count = count
    this.counter = 0
  }

  get finished () {
    return typeof this.count === 'number' && this.counter >= this.count
  }

  has (callback) {
    return this.callback === callback
  }

  trigger (object, event) {
    if (this.callback.call(object, event) === false) event.stopPropagation()
    this.counter++

    return !event.propagationStopped
  }
}
