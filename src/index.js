import Handler from './handler'

export default class Dispatcher {
  constructor () {
    this.handler = new Handler(this)
  }

  on (events, callback, count) {
    this.handler.add(events, callback, count)
    return this
  }

  once (events, callback) {
    this.on(events, callback, 1)
    return this
  }

  off (events, callback) {
    this.handler.remove(events, callback)
    return this
  }

  require (events, callback) {
    if (this.dispatched(events)) this.handler.call(events, callback)
    else this.once(events, callback)
    return this
  }

  dispatched (events, count) {
    return this.handler.triggered(events, count)
  }

  dispatch (events, data) {
    this.handler.trigger(events, data)
    return this
  }
}
