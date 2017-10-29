'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stack = function () {
  function Stack(type) {
    _classCallCheck(this, Stack);

    this.type = type;
    this.array = [];
    this.counter = 0;
  }

  _createClass(Stack, [{
    key: 'add',
    value: function add(callback, count) {
      this.array.push(new _listener2.default(callback, count));
    }
  }, {
    key: 'remove',
    value: function remove(callback) {
      var index = this.index(callback);
      if (index !== -1) this.splice(index);
    }
  }, {
    key: 'splice',
    value: function splice(index) {
      this.array.splice(index, 1);
    }
  }, {
    key: 'index',
    value: function index(callback) {
      return this.array.indexBy(function (listener) {
        return listener.has(callback);
      });
    }
  }, {
    key: 'each',
    value: function each(callback) {
      for (var i = 0; i < this.length; i++) {
        if (callback.call(this, this.array[i], i) === false) break;
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(object, data) {
      var _this = this;

      var event = new _event2.default(this.type, data);
      var result;

      this.each(function (listener, index) {
        result = listener.trigger(object, event);
        if (listener.finished) _this.splice(index);

        return result;
      });

      this.counter++;

      return !event.propagationStopped;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.array.length;
    }
  }]);

  return Stack;
}();

exports.default = Stack;