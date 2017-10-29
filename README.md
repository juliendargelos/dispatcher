# Dispatcher

This package let you make any object acting as an event dispatcher:

```javascript
import Dispatcher from 'dispatcher'

class MyApi extends Dispatcher {
  constructor () {
    super()
    this.load()
  }

  load () {
    // Loading stuff...
    this.dispatch('load', {
      message: 'Api loaded!'
    })
  }

  get (id, callback) {
    // Your api needs to be loaded in order to get data!
    // The callback passed to 'require' will be instantly called if
    // the event already happened, else it will wait for it.
    this.require('load', () => {
      // Getting data...
      callback.call(this, data)

      this.dispatch('get', {
        data: data
      })
    })
  }

  update () {
    // Updating stuff...
    this.dispatch('update')
  }
}

var api = new Api()

api.once('load', event => alert(event.message))     // Will be called once before getting removed
api.on('update', event => alert('An updated'), 5)   // Will be called 5 times before getting removed
api.on('get', function getListener(event) {         // Will be called until the listener is removed
  console.log(event.data)
})

setTimeout(() => api.off('get', getListener), 5000) // Now removed...
```
