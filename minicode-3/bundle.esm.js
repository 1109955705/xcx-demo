function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function idToRgba(id) {
  return id.split("-");
}
function rgbaToId(rgba) {
  return rgba.join("-");
}
var idPool = {};
function createId() {
  var id = createOnceId();

  while (idPool[id]) {
    id = createOnceId();
  }

  return id;
}

function createOnceId() {
  return Array(3).fill(0).map(function () {
    return Math.ceil(Math.random() * 255);
  }).concat(255).join("-");
}

var Base = /*#__PURE__*/function () {
  function Base() {
    _classCallCheck(this, Base);

    this.id = createId();
    this.listeners = {};
  }

  _createClass(Base, [{
    key: "draw",
    value: function draw(ctx, osCtx) {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      if (this.listeners[eventName]) {
        this.listeners[eventName].push(listener);
      } else {
        this.listeners[eventName] = [listener];
      }
    }
  }, {
    key: "getListeners",
    value: function getListeners() {
      return this.listeners;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }]);

  return Base;
}();

var Rect = /*#__PURE__*/function (_Base) {
  _inherits(Rect, _Base);

  var _super = _createSuper(Rect);

  function Rect(props) {
    var _this;

    _classCallCheck(this, Rect);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "drawProps", {
      origin: [0, 0],
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      radius0: 0,
      radius1: 0,
      radius2: 0,
      radius3: 0,
      strokeWidth: 0,
      strokeColor: '',
      fillColor: ''
    });

    _this.props = props;
    _this.drawProps.x = _this.props.x || 0;
    _this.drawProps.y = _this.props.y || 0;
    _this.drawProps.width = _this.props.width || 0;
    _this.drawProps.height = _this.props.height || 0;
    _this.drawProps.radius0 = _this.props.radius0 || 0;
    _this.drawProps.radius1 = _this.props.radius1 || 0;
    _this.drawProps.radius2 = _this.props.radius2 || 0;
    _this.drawProps.radius3 = _this.props.radius3 || 0;
    _this.drawProps.fillColor = _this.props.fillColor || '#fff';
    _this.drawProps.origin = _this.props.origin || [0, 0];
    return _this;
  }

  _createClass(Rect, [{
    key: "draw",
    value: function draw(ctx, osCtx) {
      var _this$drawProps = this.drawProps,
          x = _this$drawProps.x,
          y = _this$drawProps.y,
          origin = _this$drawProps.origin,
          width = _this$drawProps.width,
          height = _this$drawProps.height,
          radius0 = _this$drawProps.radius0,
          radius1 = _this$drawProps.radius1,
          radius2 = _this$drawProps.radius2,
          radius3 = _this$drawProps.radius3,
          fillColor = _this$drawProps.fillColor;
      ctx.save();
      ctx.translate(origin[0], origin[1]);
      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.moveTo(x, y + radius0);
      ctx.quadraticCurveTo(x, y, x + radius0, y);
      ctx.lineTo(x + width - radius1, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius1);
      ctx.lineTo(x + width, y + height - radius2);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius2, y + height);
      ctx.lineTo(x + radius3, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius3);
      ctx.fill();
      ctx.restore();

      var _idToRgba = idToRgba(this.id),
          _idToRgba2 = _slicedToArray(_idToRgba, 4),
          r = _idToRgba2[0],
          g = _idToRgba2[1],
          b = _idToRgba2[2],
          a = _idToRgba2[3]; // all


      osCtx.save();
      osCtx.translate(origin[0], origin[1]);
      osCtx.beginPath();
      osCtx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      osCtx.rect(x, y, width, height);
      osCtx.fill();
      osCtx.restore();
    }
  }]);

  return Rect;
}(Base);

var Circle = /*#__PURE__*/function (_Base) {
  _inherits(Circle, _Base);

  var _super = _createSuper(Circle);

  function Circle(props) {
    var _this;

    _classCallCheck(this, Circle);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "drawProps", {
      origin: [0, 0],
      x: 0,
      y: 0,
      radius: 0,
      strokeWidth: 0,
      strokeColor: '',
      fillColor: ''
    });

    _this.props = props;
    _this.drawProps.x = _this.props.x || 0;
    _this.drawProps.y = _this.props.y || 0;
    _this.drawProps.radius = _this.props.radius || 0;
    _this.drawProps.fillColor = _this.props.fillColor || '#fff';
    _this.drawProps.origin = _this.props.origin || [0, 0];
    return _this;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw(ctx, osCtx) {
      var _this$drawProps = this.drawProps,
          x = _this$drawProps.x,
          y = _this$drawProps.y,
          origin = _this$drawProps.origin,
          radius = _this$drawProps.radius,
          fillColor = _this$drawProps.fillColor;
      ctx.save();
      ctx.beginPath();
      ctx.translate(origin[0], origin[1]);
      ctx.fillStyle = fillColor;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      var _idToRgba = idToRgba(this.id),
          _idToRgba2 = _slicedToArray(_idToRgba, 4),
          r = _idToRgba2[0],
          g = _idToRgba2[1],
          b = _idToRgba2[2],
          a = _idToRgba2[3]; // all


      osCtx.save();
      osCtx.beginPath();
      osCtx.translate(origin[0], origin[1]);
      osCtx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      osCtx.arc(x, y, radius, 0, Math.PI * 2);
      osCtx.fill();
      osCtx.stroke();
      osCtx.restore();
    }
  }]);

  return Circle;
}(Base);

var EventNames;

(function (EventNames) {
  EventNames["mouseclick"] = "mouseclick";
  EventNames["mousedown"] = "mousedown";
  EventNames["mousemove"] = "mousemove";
  EventNames["mouseup"] = "mouseup";
  EventNames["mouseenter"] = "mouseenter";
  EventNames["mouseleave"] = "mouseleave";
})(EventNames || (EventNames = {}));

var ActionType;

(function (ActionType) {
  ActionType["Down"] = "DOWN";
  ActionType["Up"] = "Up";
  ActionType["Move"] = "MOVE";
  ActionType["Click"] = "Click";
})(ActionType || (ActionType = {}));

var EventSimulator = /*#__PURE__*/function () {
  function EventSimulator() {
    _classCallCheck(this, EventSimulator);

    _defineProperty(this, "listenersMap", {});

    _defineProperty(this, "lastDownId", '');

    _defineProperty(this, "lastMoveId", '');
  }

  _createClass(EventSimulator, [{
    key: "emit",
    value: function emit(action, evt) {
      var type = action.type,
          id = action.id; // console.log('=======', type, ids)

      switch (type) {
        case ActionType.Move:
          if (!this.lastMoveId || this.lastMoveId !== id) {
            this.fire(id, EventNames.mouseenter, evt);
            this.fire(this.lastMoveId, EventNames.mouseleave, evt);
          } else {
            // mouseover
            this.fire(id, EventNames.mousemove, evt);
          }

          this.lastMoveId = action.id;
          break;

        case ActionType.Down:
          this.fire(id, EventNames.mousedown, evt);
          this.lastDownId = action.id;
          break;

        case ActionType.Up:
          this.fire(id, EventNames.mouseup, evt);
          break;

        case ActionType.Click:
          this.fire(id, EventNames.mouseclick, evt);
          break;

        default:
          console.log('default emit');
      }
    }
  }, {
    key: "addListeners",
    value: function addListeners(id, listeners) {
      this.listenersMap[id] = listeners;
    }
  }, {
    key: "fire",
    value: function fire(id, eventName, evt) {
      if (this.listenersMap[id] && this.listenersMap[id][eventName]) {
        this.listenersMap[id][eventName].forEach(function (listener) {
          return listener(evt);
        });
      }
    }
  }]);

  return EventSimulator;
}();

var Stage = /*#__PURE__*/function () {
  function Stage(canvas, osCanvas, dpr) {
    var _this = this;

    _classCallCheck(this, Stage);

    _defineProperty(this, "handleCreator", function (type) {
      return function (evt) {
        var x = evt.offsetX;
        var y = evt.offsetY;

        var id = _this.hitJudge(x, y);

        _this.eventSimulator.emit({
          type: type,
          id: id
        }, evt);
      };
    });

    this.initWidth = canvas.width;
    this.initHeight = canvas.height;
    this.canvas = canvas;
    this.osCanvas = osCanvas || new OffscreenCanvas(canvas.width, canvas.height);
    dpr = dpr || window.devicePixelRatio;
    this.ctx = this.canvas.getContext('2d');
    this.osCtx = this.osCanvas.getContext('2d');
    console.log('xxxxxxx', this.ctx, this.osCtx);
    this.ctx.scale(dpr, dpr);
    this.osCtx.scale(dpr, dpr);
    this.dpr = dpr; // this.canvas.addEventListener('mousedown', this.handleCreator(ActionType.Down));
    // this.canvas.addEventListener('mouseup', this.handleCreator(ActionType.Up));
    // this.canvas.addEventListener('mousemove', this.handleCreator(ActionType.Move));
    // this.canvas.addEventListener('click', this.handleCreator(ActionType.Click));

    this.shapes = new Set();
    this.ctxList = [this.osCtx];
    this.eventSimulator = new EventSimulator();
  }

  _createClass(Stage, [{
    key: "add",
    value: function add(shape) {
      var id = shape.getId();
      this.eventSimulator.addListeners(id, shape.getListeners());
      this.shapes.add(id);
      shape.draw(this.ctx, this.osCtx);
    }
  }, {
    key: "hitJudge",
    value:
    /**
     * 判断当前鼠标位置是否存在图形，如果存在返回其id
     * @param x
     * @param y
     */
    function hitJudge(x, y) {
      var rgba = Array.from(this.osCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data);
      var id = rgbaToId(rgba);
      return this.shapes.has(id) ? id : '';
    }
  }]);

  return Stage;
}();

export { Circle, EventNames, Rect, Stage };
