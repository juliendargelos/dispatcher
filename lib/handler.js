'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stack = require('./stack');

var _stack2 = _interopRequireDefault(_stack);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handler = function () {
  function Handler() {
    _classCallCheck(this, Handler);
  }

  _createClass(Handler, [{
    key: 'construct',
    value: function construct(object) {
      this.object = object;
      this.stacks = {};
    }
  }, {
    key: 'available',
    value: function available(event) {
      return this.stacks[event] instanceof _stack2.default;
    }
  }, {
    key: 'triggered',
    value: function triggered(events, count) {
      var _this = this;

      if (typeof counter !== 'number') count = 1;
      var triggered = false;

      this.split(events).forEach(function (event) {
        if (_this.stacks[event].counter >= count) triggered = true;
        return !triggered;
      });

      return triggered;
    }
  }, {
    key: 'init',
    value: function init(event) {
      this.stacks[event] = new _stack2.default(event);
    }
  }, {
    key: 'add',
    value: function add(events, callback, count) {
      var _this2 = this;

      this.split(events).forEach(function (event) {
        if (!_this2.available(event)) _this2.init(event);
        _this2.stacks[event].add(callback, count);
      });
    }
  }, {
    key: 'remove',
    value: function remove(events, callback) {
      var _this3 = this;

      this.split(events).forEach(function (event) {
        if (_this3.available(event)) _this3[event].remove(callback);
      });
    }
  }, {
    key: 'trigger',
    value: function trigger(events, data) {
      var _this4 = this;

      this.split(events).forEach(function (event) {
        _this4.triggered.push(event);
        _this4.stacks[event].trigger(_this4.object, data);
      });
    }
  }, {
    key: 'call',
    value: function call(events, callback, data) {
      events = this.split(events);
      if (events.length > 0) callback.call(this.object, new _event2.default(events[0], data));
    }
  }, {
    key: 'split',
    value: function split(events) {
      return (events + '').split(' ').map(function (event) {
        return event.trim();
      });
    }
  }]);

  return Handler;
}();

exports.default = Handler;