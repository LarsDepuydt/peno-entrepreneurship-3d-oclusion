"use strict";
exports.id = 962;
exports.ids = [962];
exports.modules = {

/***/ 962:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LoginForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_LoginForm_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2669);
/* harmony import */ var _styles_LoginForm_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_LoginForm_module_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _public_relu_logo_small_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7824);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9752);
/* harmony import */ var _gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5652);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__, _gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_6__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__, _gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// most popular open source form library








function LoginForm() {
    const [credentials, setData] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)({
        email: "",
        password: ""
    });
    const { data  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.useQuery)(_gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_6__/* .login.useQuery */ .x4.useQuery(credentials));
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const submitFunction = (values)=>{
        console.log(values);
        setData(values);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        data?.token && credentials.email && router.push("/patient");
    }, [
        data,
        credentials,
        router
    ]);
    const toRegister = ()=>router.push("/register-page");
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_LoginForm_module_css__WEBPACK_IMPORTED_MODULE_8___default().login_box) + " p-3",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                className: (_styles_LoginForm_module_css__WEBPACK_IMPORTED_MODULE_8___default().small_logo_log),
                src: _public_relu_logo_small_png__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
                alt: "relu logo"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Formik, {
                initialValues: {
                    email: "",
                    password: ""
                },
                onSubmit: submitFunction,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_1__.Form, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                className: "form-control",
                                id: "email",
                                name: "email",
                                placeholder: "Email",
                                "aria-describedby": "usernameHelp"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                className: "form-control",
                                id: "password",
                                name: "password",
                                placeholder: "Password",
                                type: "password"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_styles_LoginForm_module_css__WEBPACK_IMPORTED_MODULE_8___default().spacingbtn),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "submit",
                                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_9___default().relu_btn),
                                    children: "Login"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_9___default().relu_btn),
                                    onClick: toRegister,
                                    children: "Register instead"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;