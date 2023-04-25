"use strict";
exports.id = 54;
exports.ids = [54];
exports.modules = {

/***/ 2054:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5931);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(310);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useStorage__WEBPACK_IMPORTED_MODULE_4__]);
_hooks_useStorage__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const DownloadButton = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const path = "gs://relu-vr-scan-database.appspot.com/Pati\xebnt-Scans/Patient-1/upper_ios_6.obj";
    const { handleDownloadClick , loading , error  } = (0,_hooks_useStorage__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(path);
    if (loading) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            type: "button",
            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
            id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().loadingIcon),
            disabled: true
        });
    }
    if (error) {
        console.error(error);
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            type: "button",
            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
            id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().exportIcon),
            disabled: true,
            children: "Error"
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            type: "button",
            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
            id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().exportIcon),
            onClick: handleDownloadClick
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DownloadButton);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9901:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ storage)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3392);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_storage__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_storage__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnCIzVDVMlv4YyG0N9YTRHdhlQ_GQ18b8",
    authDomain: "relu-backend.firebaseapp.com",
    projectId: "relu-backend",
    storageBucket: "relu-backend.appspot.com",
    messagingSenderId: "309843565343",
    appId: "1:309843565343:web:ba09eabcc3b6e98217ee2a",
    measurementId: "G-XBYJT660Z4"
};
// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.getStorage)(app);
// Export the instances you need


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 310:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3392);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9901);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_storage__WEBPACK_IMPORTED_MODULE_1__, _firebase__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_storage__WEBPACK_IMPORTED_MODULE_1__, _firebase__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useStorage = (path)=>{
    const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.ref)(_firebase__WEBPACK_IMPORTED_MODULE_2__/* .storage */ .t, path);
        (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.getDownloadURL)(storageRef).then((url)=>{
            setUrl(url);
            setLoading(false);
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        });
    }, [
        path
    ]);
    const handleDownloadClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (!url) return;
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "lowerjaw_holger.obj";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }, [
        url
    ]);
    return {
        handleDownloadClick,
        loading,
        error
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStorage);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;