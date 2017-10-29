export default class Event {
  constructor (type, data) {
    this.propagationStopped = false

    Object.defineProperties(this, {
      type: {
        value: type,
        writable: false
      }
    })

    Object.defineProperties(this, Object.getownPropertyDescriptors(data))
  }

  stopPropagation () {
    this.propagationStopped = true
  }
}
