'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = require('./handler');

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this.handler = new _handler2.default(this);
  }

  _createClass(Dispatcher, [{
    key: 'on',
    value: function on(events, callback, count) {
      this.handler.add(events, callback, count);
      return this;
    }
  }, {
    key: 'once',
    value: function once(events, callback) {
      this.on(events, callback, 1);
      return this;
    }
  }, {
    key: 'off',
    value: function off(events, callback) {
      this.handler.remove(events, callback);
      return this;
    }
  }, {
    key: 'require',
    value: function require(events, callback) {
      if (this.dispatched(events)) this.handler.call(events, callback);else this.once(events, callback);
      return this;
    }
  }, {
    key: 'dispatched',
    value: function dispatched(events, count) {
      return this.handler.triggered(events, count);
    }
  }, {
    key: 'dispatch',
    value: function dispatch(events, data) {
      this.handler.trigger(events, data);
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;