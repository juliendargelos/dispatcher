"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(type, data) {
    _classCallCheck(this, Event);

    this.propagationStopped = false;

    Object.defineProperties(this, {
      type: {
        value: type,
        writable: false
      }
    });

    Object.defineProperties(this, Object.getownPropertyDescriptors(data));
  }

  _createClass(Event, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this.propagationStopped = true;
    }
  }]);

  return Event;
}();

exports.default = Event;