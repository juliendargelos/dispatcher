import Listener from './listener'
import Event from './event'

export default class Stack {
  constructor (type) {
    this.type = type
    this.array = []
    this.counter = 0
  }

  get length () {
    return this.array.length
  }

  add (callback, count) {
    this.array.push(new Listener(callback, count))
  }

  remove (callback) {
    const index = this.index(callback)
    if (index !== -1) this.splice(index)
  }

  splice (index) {
    this.array.splice(index, 1)
  }

  index (callback) {
    return this.array.indexBy(listener => listener.has(callback))
  }

  each (callback) {
    for (var i = 0; i < this.length; i++) {
      if (callback.call(this, this.array[i], i) === false) break
    }
  }

  trigger (object, data) {
    const event = new Event(this.type, data)
    var result

    this.each((listener, index) => {
      result = listener.trigger(object, event)
      if (listener.finished) this.splice(index)

      return result
    })

    this.counter++

    return !event.propagationStopped
  }
}
