"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _component = _interopRequireDefault(require("./component.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FileInput = function FileInput(_ref) {
  var Component = _ref.component,
      className = _ref.className,
      validFormats = _ref.validFormats,
      name = _ref.name,
      hideName = _ref.hideName,
      hideError = _ref.hideError,
      hideDelete = _ref.hideDelete;

  var _useFormikContext = (0, _formik.useFormikContext)(),
      values = _useFormikContext.values,
      errors = _useFormikContext.errors,
      touched = _useFormikContext.touched,
      setFieldValue = _useFormikContext.setFieldValue,
      setFieldTouched = _useFormikContext.setFieldTouched,
      setFieldError = _useFormikContext.setFieldError;

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

  var handleFileUpload = function handleFileUpload(e) {
    var file = e.target.files[0];
    setFieldTouched(name, true);

    if (isFileValid(file)) {
      setFieldValue(name, file);
      setFieldError(name, null);
    }
  };

  var handleFileDelete = _react["default"].useCallback(function () {
    setFieldValue(name, null);
    setFieldError(name, null);
  }, []);

  var fileInputProps = {
    InputComponent: Component,
    className: className,
    handleChange: handleFileUpload,
    fileName: values[name] && values[name].name
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_component["default"], fileInputProps), !hideName && /*#__PURE__*/_react["default"].createElement("p", null, values[name] && values[name].name), !hideError && touched[name] && /*#__PURE__*/_react["default"].createElement("p", null, errors[name]), !hideDelete && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleFileDelete
  }, "Delete"));
};

exports.FileInput = FileInput;