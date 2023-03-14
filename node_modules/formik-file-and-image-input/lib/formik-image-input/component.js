"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultComponent = function DefaultComponent(_ref) {
  var passRef = _ref.passRef,
      hidden = _ref.hidden,
      onChange = _ref.onChange;
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    ref: passRef,
    onChange: onChange,
    style: hidden ? {
      display: "none"
    } : {}
  });
};

var ImageInput = function ImageInput(_ref2) {
  var InputComponent = _ref2.InputComponent,
      className = _ref2.className,
      handleChange = _ref2.handleChange,
      fileName = _ref2.fileName,
      imageUrl = _ref2.imageUrl,
      inputRef = _ref2.inputRef,
      showInputWindow = _ref2.showInputWindow,
      handleImageDelete = _ref2.handleImageDelete;

  var Component = /*#__PURE__*/_react["default"].memo(function () {
    if (InputComponent) {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(DefaultComponent, {
        hidden: true,
        passRef: inputRef,
        onChange: handleChange
      }), /*#__PURE__*/_react["default"].createElement(InputComponent, {
        fileName: fileName,
        src: imageUrl,
        onClick: showInputWindow,
        onDelete: handleImageDelete
      }));
    }

    return /*#__PURE__*/_react["default"].createElement(DefaultComponent, {
      passRef: inputRef,
      onChange: handleChange
    });
  });

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(Component, null));
};

var _default = ImageInput;
exports["default"] = _default;