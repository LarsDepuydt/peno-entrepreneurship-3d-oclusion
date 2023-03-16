"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _component = _interopRequireDefault(require("./component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var universalImageFormats = ["image/png", "image/svg+xml", "image/jpeg", "image/gif", "image/bmp", "image/tiff", "image/webp"];

var ImageInput = function ImageInput(_ref) {
  var Component = _ref.component,
      className = _ref.className,
      _ref$validFormats = _ref.validFormats,
      validFormats = _ref$validFormats === void 0 ? universalImageFormats : _ref$validFormats,
      name = _ref.name,
      hideName = _ref.hideName,
      hideError = _ref.hideError,
      hideDelete = _ref.hideDelete,
      hideEdit = _ref.hideEdit;

  var _useFormikContext = (0, _formik.useFormikContext)(),
      values = _useFormikContext.values,
      errors = _useFormikContext.errors,
      touched = _useFormikContext.touched,
      setFieldValue = _useFormikContext.setFieldValue,
      setFieldTouched = _useFormikContext.setFieldTouched,
      setFieldError = _useFormikContext.setFieldError;

  var _React$useState = _react["default"].useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      imageUrl = _React$useState2[0],
      setImageUrl = _React$useState2[1];

  var inputRef = _react["default"].useRef(null);

  var isFileValid = _react["default"].useCallback(function (file) {
    if (!validFormats.includes(file.type)) {
      setFieldValue(name, null);
      setTimeout(function () {
        setFieldError(name, "Invalid file format. Accepted formats are ".concat(validFormats.join(", ")));
      }, 0);
      return false;
    }

    return true;
  }, [validFormats]);

  var generateImageUrl = function generateImageUrl(image) {
    var reader = new FileReader();

    reader.onload = function (e) {
      setImageUrl(e.target.result);
    };

    reader.readAsDataURL(image);
  };

  var handleImageUpload = function handleImageUpload(e) {
    var image = e.target.files[0];
    setFieldTouched(name, true);

    if (isFileValid(image)) {
      setFieldValue(name, image);
      setFieldError(name, null);
      generateImageUrl(image);
    }
  };

  var handleImageDelete = _react["default"].useCallback(function () {
    setFieldValue(name, null);
    setFieldError(name, null);
    setImageUrl(null);
  }, []);

  var showInputWindow = _react["default"].useCallback(function (e) {
    inputRef.current.click();
    e.stopPropagation();
  }, [inputRef]);

  var imageInputProps = {
    InputComponent: Component,
    className: className,
    handleChange: handleImageUpload,
    fileName: values[name] && values[name].name,
    showInputWindow: showInputWindow,
    inputRef: inputRef,
    imageUrl: imageUrl,
    handleImageDelete: handleImageDelete
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_component["default"], imageInputProps), !hideName && /*#__PURE__*/_react["default"].createElement("p", null, values[name] && values[name].name), !hideError && touched[name] && /*#__PURE__*/_react["default"].createElement("p", null, errors[name]), !hideEdit && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: showInputWindow
  }, "Edit"), !hideDelete && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleImageDelete
  }, "Delete"));
};

exports.ImageInput = ImageInput;