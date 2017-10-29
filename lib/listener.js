'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function () {
  function Listener(callback, count) {
    _classCallCheck(this, Listener);

    this.callback = callback;
    this.count = count;
    this.counter = 0;
  }

  _createClass(Listener, [{
    key: 'has',
    value: function has(callback) {
      return this.callback === callback;
    }
  }, {
    key: 'trigger',
    value: function trigger(object, event) {
      if (this.callback.call(object, event) === false) event.stopPropagation();
      this.counter++;

      return !event.propagationStopped;
    }
  }, {
    key: 'finished',
    get: function get() {
      return typeof this.count === 'number' && this.counter >= this.count;
    }
  }]);

  return Listener;
}();

exports.default = Listener;