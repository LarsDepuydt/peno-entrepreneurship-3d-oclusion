exports.id = 181;
exports.ids = [181];
exports.modules = {

/***/ 4454:
/***/ ((module) => {

// Exports
module.exports = {
	"small_logo": "Header_small_logo__pMdKz",
	"logout_layout": "Header_logout_layout__Pgz4H",
	"header_layout": "Header_header_layout__8MdWu",
	"bigText": "Header_bigText__7zira",
	"buttons": "Header_buttons__7c5BZ"
};


/***/ }),

/***/ 8312:
/***/ ((module) => {

// Exports
module.exports = {
	"active_modal": "Modal_active_modal__lXHjq",
	"btn_modal": "Modal_btn_modal__Fe61c",
	"modal": "Modal_modal__qEzCd",
	"overlay": "Modal_overlay__X17wg",
	"modal_content": "Modal_modal_content__VMZOU",
	"close_modal": "Modal_close_modal__6QdvL",
	"login_box": "Modal_login_box__dmAGm",
	"small_logo": "Modal_small_logo__acuey",
	"spacingbtn": "Modal_spacingbtn__pexcq",
	"center": "Modal_center__eIfy0",
	"firstandlast": "Modal_firstandlast__Np0xd",
	"type_bite": "Modal_type_bite__RHpsr",
	"type_surgery": "Modal_type_surgery__cK_sE",
	"rightfont": "Modal_rightfont__g82my",
	"right": "Modal_right__4UEJr"
};


/***/ }),

/***/ 6170:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar": "Sidebar_sidebar__uH0V9",
	"sidebarText": "Sidebar_sidebarText__CI3w7",
	"sidebarName": "Sidebar_sidebarName__eKtp2"
};


/***/ }),

/***/ 8961:
/***/ ((module) => {

// Exports
module.exports = {
	"scansWrapper": "PatientPage_scansWrapper__kIMcx",
	"patientScan_container": "PatientPage_patientScan_container__GqVt_",
	"picture_wrapper": "PatientPage_picture_wrapper___01TF",
	"picture": "PatientPage_picture__tbhHy",
	"picture_hover": "PatientPage_picture_hover__572FQ",
	"patientScan_normal": "PatientPage_patientScan_normal__p_DRA",
	"patientScan_dropDown": "PatientPage_patientScan_dropDown__jvXDA",
	"patientscanName": "PatientPage_patientscanName__g11Bq",
	"patientscanNameWrapper": "PatientPage_patientscanNameWrapper__hhU3y",
	"patientscanNameWrapperInvisible": "PatientPage_patientscanNameWrapperInvisible__sRHLf",
	"subButtons": "PatientPage_subButtons__0Pelc",
	"dropDownButtonWrapper": "PatientPage_dropDownButtonWrapper__4Y8La",
	"projects": "PatientPage_projects__29x9u"
};


/***/ }),

/***/ 916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/3d-teeth.d0b8b532.jpg","height":499,"width":800,"blurDataURL":"data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAeEAACAQMFAAAAAAAAAAAAAAAAAQIDBBESFBUhQf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AKLtrjl3WV7NRklmnp6wvAAKkf/Z","blurWidth":8,"blurHeight":5});

/***/ }),

/***/ 8609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Q": () => (/* binding */ HeaderDoctor),
  "A": () => (/* binding */ HeaderPatient)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/styles/Buttons.module.css
var Buttons_module = __webpack_require__(3436);
var Buttons_module_default = /*#__PURE__*/__webpack_require__.n(Buttons_module);
;// CONCATENATED MODULE: ./src/components/header/logout-button.tsx



function LogoutButton() {
    const clickLogout = ()=>{
        router.push("/login-page") // change state f -> t and t -> f
        ;
    };
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
            type: "button",
            id: (Buttons_module_default()).logOut,
            className: (Buttons_module_default()).relu_btn,
            onClick: clickLogout,
            children: "Log out"
        })
    });
}

// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/styles/Header.module.css
var Header_module = __webpack_require__(4454);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
// EXTERNAL MODULE: ./public/relu-logo-small.png
var relu_logo_small = __webpack_require__(7824);
;// CONCATENATED MODULE: ./src/components/header/header.tsx





function HeaderDoctor() {
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Header_module_default()).header_layout,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    className: (Header_module_default()).small_logo,
                    src: relu_logo_small/* default */.Z,
                    alt: "relu logo"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: (Header_module_default()).bigText,
                    children: "Patient Overview"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (Header_module_default()).logout_layout,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(LogoutButton, {})
                })
            ]
        })
    });
}
function HeaderPatient() {
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Header_module_default()).header_layout,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    className: (Header_module_default()).small_logo,
                    src: relu_logo_small/* default */.Z,
                    alt: "relu logo"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: (Header_module_default()).bigText,
                    children: "Scans Overview"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (Header_module_default()).logout_layout,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(LogoutButton, {})
                })
            ]
        })
    });
}


/***/ }),

/***/ 5670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_2__);



function LinkButton() {
    const handleClick = ()=>{
        window.location.href = "https://relu.eu/";
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_2___default().relu_btn),
        id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_2___default().LinkIcon),
        onClick: handleClick
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkButton);


/***/ }),

/***/ 1481:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ SidebarPatient),
/* harmony export */   "M": () => (/* binding */ SidebarDoctor)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6170);
/* harmony import */ var _styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _popups_new_patient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2299);
/* harmony import */ var _popups_new_scan__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9134);
/* harmony import */ var _search_filter_tags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4364);
/* harmony import */ var _search_search_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6492);
/* harmony import */ var _search_search_name__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8362);
/* harmony import */ var _header_reluLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5670);
/* harmony import */ var _welcoming__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5705);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_popups_new_patient__WEBPACK_IMPORTED_MODULE_3__]);
_popups_new_patient__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












function SidebarDoctor() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_10___default().sidebar),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_welcoming__WEBPACK_IMPORTED_MODULE_9__/* .WelcomingDoctor */ .A, {
                    doctorfirstname: "Anna",
                    doctorlastname: "Proost"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default().sidebarButton),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_popups_new_patient__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_search_id__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_search_name__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default().absoluteWrapper),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header_reluLink__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {})
                })
            ]
        })
    });
}
function SidebarPatient({ patientfirstname , patientlastname  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const home = ()=>router.push("/patient");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_10___default().sidebar),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_welcoming__WEBPACK_IMPORTED_MODULE_9__/* .WelcomingPatient */ .n, {
                    patientfirstname: patientfirstname,
                    patientlastname: patientlastname
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default().sidebarButton),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_popups_new_scan__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_filter_tags__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default().absoluteWrapper),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default().relu_btn),
                            id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_11___default().homeIcon),
                            onClick: home
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header_reluLink__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {})
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ WelcomingDoctor),
/* harmony export */   "n": () => (/* binding */ WelcomingPatient)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6170);
/* harmony import */ var _styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1__);
// possibly welcome doctor in the future ?


function WelcomingDoctor({ doctorfirstname , doctorlastname  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1___default().sidebarText),
                children: "Welcome Dr. "
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1___default().sidebarName),
                children: "".concat(doctorfirstname, " ", doctorlastname, "\n")
            })
        ]
    });
}
function WelcomingPatient({ patientfirstname , patientlastname  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1___default().sidebarText),
                children: "Scans of patient:"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: (_styles_Sidebar_module_css__WEBPACK_IMPORTED_MODULE_1___default().sidebarName),
                children: "".concat(patientfirstname, " ", patientlastname, "\n")
            })
        ]
    });
}


/***/ }),

/***/ 2299:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8312);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5931);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9752);
/* harmony import */ var _gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5652);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__, _gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_4__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__, _gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function ModalForm() {
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    // modal is not toggled at first
    const [patientinfo, setData] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)({
        //patientID: '',
        patientFirstName: "",
        patientLastName: "",
        pinned: false,
        notes: ""
    });
    const { data  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(_gen_proto_threedoclusion_v1_service_ScanService_connectquery__WEBPACK_IMPORTED_MODULE_4__/* .addPatient.useQuery */ .b$.useQuery(patientinfo));
    // kunnen we van pinned een boolean maken?
    const toggleModal = ()=>{
        setModal(!modal); // change state f -> t and t -> f
    };
    const submitFunction = (values)=>{
        console.log(values);
        //setData(values);
        setModal(!modal);
    };
    // useEffect(() => {
    // }, [data, patientinfo]);
    // heeft geen effect ?
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().btn_modal),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: toggleModal,
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7___default().relu_btn),
                    id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7___default().fixedWidth),
                    children: "Add Patient"
                })
            }),
            modal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().modal),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().overlay)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().modal_content),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().login_box) + " p-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Formik, {
                                initialValues: {
                                    patientID: "",
                                    patientFirstName: "",
                                    patientLastName: "",
                                    pinned: false,
                                    notes: ""
                                },
                                // on Submit we console the values + close the popup tab
                                onSubmit: submitFunction,
                                children: ({ errors , status , touched  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Form, {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().rightfont),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "mb-3",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                                        className: "form-control",
                                                        id: "patientID",
                                                        name: "patientID",
                                                        placeholder: "Patient ID",
                                                        type: "patientID"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().firstandlast),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mb-3",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                                                className: "form-control",
                                                                id: "patientFirstName",
                                                                name: "patientFirstName",
                                                                placeholder: "First Name"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mb-3",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                                                className: "form-control",
                                                                id: "patientLastName",
                                                                name: "patientLastName",
                                                                placeholder: "Last Name"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "form-group form-check",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                                            type: "checkbox",
                                                            name: "pinned",
                                                            className: "form-check-input " + (errors.pinned && touched.pinned ? " is-invalid" : "")
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            htmlFor: "pinned",
                                                            className: "form-check-label",
                                                            children: "Pin patient"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.ErrorMessage, {
                                                            name: "pinned",
                                                            component: "div",
                                                            className: "invalid-feedback"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "mb-3",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_1__.Field, {
                                                        className: "form-control",
                                                        id: "notes",
                                                        name: "notes",
                                                        placeholder: "Additional notes",
                                                        type: "notes"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_6___default().spacingbtn),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "submit",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7___default().relu_btn),
                                                            children: "Save patient"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_7___default().relu_btn),
                                                            onClick: toggleModal,
                                                            children: "Exit"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                            })
                        })
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8312);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4__);





function ModalForm() {
    //  file handlers
    const onFileUploadChange = (e)=>{
        console.log("From onFileUploadChange");
    };
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // modal is not open at first
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const toggleModal = ()=>setModal(!modal); // change state f -> t and t -> f
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().btn_modal),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: toggleModal,
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4___default().relu_btn),
                    id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4___default().fixedWidth),
                    children: "Add Scans"
                })
            }),
            modal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().modal),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().overlay)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().modal_content),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().login_box) + " p-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
                                initialValues: {
                                    scanName: "",
                                    type_overbite: false,
                                    type_underbite: false,
                                    type_crossbite: false,
                                    type_reconstructive: false,
                                    type_jawsurgery: false,
                                    file: ""
                                },
                                // on Submit we console the values + close the popup tab
                                // implicit date = currentDate
                                onSubmit: (values)=>{
                                    console.log(values, currentDate);
                                    console.log("From onUploadFile");
                                    setModal(!modal);
                                },
                                children: ({ errors , status , touched  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "mb-3",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                    className: "form-control",
                                                    id: "scanName",
                                                    name: "scanName",
                                                    placeholder: "Scan Name"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().type_bite),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "form-group form-check",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                type: "checkbox",
                                                                name: "type_overbite",
                                                                className: "form-check-input " + (errors.type_overbite && touched.type_overbite ? " is-invalid" : "")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                htmlFor: "type_overbite",
                                                                className: "form-check-label",
                                                                children: "overbite"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                name: "type_overbite",
                                                                component: "div",
                                                                className: "invalid-feedback"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "form-group form-check",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                type: "checkbox",
                                                                name: "type_underbite",
                                                                className: "form-check-input " + (errors.type_underbite && touched.type_underbite ? " is-invalid" : "")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                htmlFor: "type_underbite",
                                                                className: "form-check-label",
                                                                children: "underbite"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                name: "type_underbite",
                                                                component: "div",
                                                                className: "invalid-feedback"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "form-group form-check",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                type: "checkbox",
                                                                name: "type_crossbite",
                                                                className: "form-check-input " + (errors.type_crossbite && touched.type_crossbite ? " is-invalid" : "")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                htmlFor: "type_crossbite",
                                                                className: "form-check-label",
                                                                children: "crossbite"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                name: "type_crossbite",
                                                                component: "div",
                                                                className: "invalid-feedback"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().type_surgery),
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "form-group form-check",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                type: "checkbox",
                                                                name: "type_reconstructive",
                                                                className: "form-check-input " + (errors.type_reconstructive && touched.type_reconstructive ? " is-invalid" : "")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                htmlFor: "type_reconstructive",
                                                                className: "form-check-label",
                                                                children: "reconstructive surgery"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                name: "type_reconstructive",
                                                                component: "div",
                                                                className: "invalid-feedback"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "form-group form-check",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                type: "checkbox",
                                                                name: "type_jawsurgery",
                                                                className: "form-check-input " + (errors.type_jawsurgery && touched.type_jawsurgery ? " is-invalid" : "")
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                htmlFor: "type_jawsurgery",
                                                                className: "form-check-label",
                                                                children: "jaw surgery"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                name: "type_jawsurgery",
                                                                component: "div",
                                                                className: "invalid-feedback"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                                className: "w-full p-3",
                                                action: "",
                                                onSubmit: (e)=>e.preventDefault(),
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            className: "block w-0 h-0",
                                                            name: "file",
                                                            type: "file",
                                                            onChange: onFileUploadChange
                                                        })
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_3___default().spacingbtn),
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "submit",
                                                        className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4___default().relu_btn),
                                                        children: "Save scans"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_4___default().relu_btn),
                                                        onClick: toggleModal,
                                                        children: "Exit"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                            })
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 4364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8312);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5931);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__);






// tags hardcoded for now
function ModalForm() {
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // modal is not toggled at first
    const toggleModal = ()=>{
        setModal(!modal); // change state f -> t and t -> f
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().btn_modal),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: toggleModal,
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                    id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().fixedWidth),
                    children: "Filter by tags"
                })
            }),
            modal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().modal),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().overlay)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().modal_content),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().login_box) + " p-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
                                initialValues: {
                                    type_overbite: false,
                                    type_underbite: false,
                                    type_crossbite: false,
                                    type_reconstructive: false,
                                    type_jawsurgery: false
                                },
                                // on Submit we console the values + close the popup tab
                                onSubmit: (values)=>{
                                    console.log(values);
                                    setModal(!modal);
                                },
                                children: ({ errors , status , touched  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().rightfont),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().type_bite),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "form-group form-check",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                    type: "checkbox",
                                                                    name: "type_overbite",
                                                                    className: "form-check-input " + (errors.type_overbite && touched.type_overbite ? " is-invalid" : "")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    htmlFor: "type_overbite",
                                                                    className: "form-check-label",
                                                                    children: "overbite"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                    name: "type_overbite",
                                                                    component: "div",
                                                                    className: "invalid-feedback"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "form-group form-check",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                    type: "checkbox",
                                                                    name: "type_underbite",
                                                                    className: "form-check-input " + (errors.type_underbite && touched.type_underbite ? " is-invalid" : "")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    htmlFor: "type_underbite",
                                                                    className: "form-check-label",
                                                                    children: "underbite"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                    name: "type_underbite",
                                                                    component: "div",
                                                                    className: "invalid-feedback"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "form-group form-check",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                    type: "checkbox",
                                                                    name: "type_crossbite",
                                                                    className: "form-check-input " + (errors.type_crossbite && touched.type_crossbite ? " is-invalid" : "")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    htmlFor: "type_crossbite",
                                                                    className: "form-check-label",
                                                                    children: "crossbite"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                    name: "type_crossbite",
                                                                    component: "div",
                                                                    className: "invalid-feedback"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().right),
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                children: "   [3 tags]"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().type_surgery),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "form-group form-check",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                    type: "checkbox",
                                                                    name: "type_reconstructive",
                                                                    className: "form-check-input " + (errors.type_reconstructive && touched.type_reconstructive ? " is-invalid" : "")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    htmlFor: "type_reconstructive",
                                                                    className: "form-check-label",
                                                                    children: "reconstructive surgery"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                    name: "type_reconstructive",
                                                                    component: "div",
                                                                    className: "invalid-feedback"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "form-group form-check",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                    type: "checkbox",
                                                                    name: "type_jawsurgery",
                                                                    className: "form-check-input " + (errors.type_jawsurgery && touched.type_jawsurgery ? " is-invalid" : "")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    htmlFor: "type_jawsurgery",
                                                                    className: "form-check-label",
                                                                    children: "jaw surgery"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                                    name: "type_jawsurgery",
                                                                    component: "div",
                                                                    className: "invalid-feedback"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().right),
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                children: " [2 tags]"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().spacingbtn),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "submit",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                                                            children: "Filter"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                                                            onClick: toggleModal,
                                                            children: "Exit"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                            })
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 6492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8312);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5931);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__);






function ModalForm() {
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // modal is not toggled at first
    const toggleModal = ()=>{
        setModal(!modal); // change state f -> t and t -> f
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().btn_modal),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: toggleModal,
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                    id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().fixedWidth),
                    children: "Search by ID"
                })
            }),
            modal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().modal),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().overlay)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().modal_content),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().login_box) + " p-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
                                initialValues: {
                                    searchID: ""
                                },
                                // on Submit we console the values + close the popup tab
                                onSubmit: (values)=>{
                                    console.log(values);
                                    setModal(!modal);
                                },
                                children: ({ errors , status , touched  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().rightfont),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "mb-3",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                        className: "form-control",
                                                        id: "searchID",
                                                        name: "searchID",
                                                        placeholder: "Patient ID"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().spacingbtn),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "submit",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                                                            children: "Search"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                                                            onClick: toggleModal,
                                                            children: "Exit"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                            })
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 8362:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ModalForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8312);
/* harmony import */ var _styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3436);
/* harmony import */ var _styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5931);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__);






function ModalForm() {
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // modal is not toggled at first
    const toggleModal = ()=>{
        setModal(!modal); // change state f -> t and t -> f
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().btn_modal),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: toggleModal,
                    className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                    id: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().fixedWidth),
                    children: "Search by name"
                })
            }),
            modal && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().modal),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().overlay)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().modal_content),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().login_box) + " p-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
                                initialValues: {
                                    searchFirstName: "",
                                    searchLastName: ""
                                },
                                // on Submit we console the values + close the popup tab
                                onSubmit: (values)=>{
                                    console.log(values);
                                    setModal(!modal);
                                },
                                children: ({ errors , status , touched  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().rightfont),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().firstandlast),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mb-3",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                className: "form-control",
                                                                id: "searchFirstName",
                                                                name: "searchFirstName",
                                                                placeholder: "First Name"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "mb-3",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                                className: "form-control",
                                                                id: "searchLastName",
                                                                name: "searchLastName",
                                                                placeholder: "Last Name"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: (_styles_Modal_module_css__WEBPACK_IMPORTED_MODULE_4___default().spacingbtn),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "submit",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                                                            children: "Search"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            className: (_styles_Buttons_module_css__WEBPACK_IMPORTED_MODULE_5___default().relu_btn),
                                                            onClick: toggleModal,
                                                            children: "Exit"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                            })
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 5931:
/***/ (() => {



/***/ })

};
;