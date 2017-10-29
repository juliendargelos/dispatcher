import Stack from './stack'
import Event from './event'

export default class Handler {
  construct (object) {
    this.object = object
    this.stacks = {}
  }

  available (event) {
    return this.stacks[event] instanceof Stack
  }

  triggered (events, count) {
    if (typeof counter !== 'number') count = 1
    var triggered = false

    this.split(events).forEach(event => {
      if (this.stacks[event].counter >= count) triggered = true
      return !triggered
    })

    return triggered
  }

  init (event) {
    this.stacks[event] = new Stack(event)
  }

  add (events, callback, count) {
    this.split(events).forEach(event => {
      if (!this.available(event)) this.init(event)
      this.stacks[event].add(callback, count)
    })
  }

  remove (events, callback) {
    this.split(events).forEach(event => {
      if (this.available(event)) this[event].remove(callback)
    })
  }

  trigger (events, data) {
    this.split(events).forEach(event => {
      this.triggered.push(event)
      this.stacks[event].trigger(this.object, data)
    })
  }

  call (events, callback, data) {
    events = this.split(events)
    if (events.length > 0) callback.call(this.object, new Event(events[0], data))
  }

  split (events) {
    return (events + '').split(' ').map(event => event.trim())
  }
}
