"use strict";
exports.id = 128;
exports.ids = [128];
exports.modules = {

/***/ 5128:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EM": () => (/* binding */ useTransport),
/* harmony export */   "YQ": () => (/* binding */ TransportProvider)
/* harmony export */ });
/* unused harmony export fallbackTransport */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bufbuild_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6950);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_bufbuild_connect__WEBPACK_IMPORTED_MODULE_1__]);
_bufbuild_connect__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const fallbackTransportError = new _bufbuild_connect__WEBPACK_IMPORTED_MODULE_1__.ConnectError("To use Connect, you must provide a `Transport`: a simple object that handles `unary` and `stream` requests. `Transport` objects can easily be created by using `@bufbuild/connect-web`'s exports `createConnectTransport` and `createGrpcWebTransport`. see: https://connect.build/docs/web/getting-started for more info.");
const fallbackTransport = {
    unary: ()=>{
        throw fallbackTransportError;
    },
    stream: ()=>{
        throw fallbackTransportError;
    }
};
const transportContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(fallbackTransport);
/**
 * Use this helper to get the default transport that's currently attached to the React context for the calling component.
 */ const useTransport = ()=>(0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(transportContext);
/**
 * `TransportProvider` is the main mechanism by which Connect-Query keeps track of the `Transport` used by your application.
 *
 * Broadly speaking, "transport" joins two concepts:
 *
 *   1. The protocol of communication.  For this there are two options: the {@link https://connect.build/docs/protocol/ Connect Protocol}, or the {@link https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md gRPC-Web Protocol}.
 *   1. The protocol options.  The primary important piece of information here is the `baseUrl`, but there are also other potentially critical options like request credentials and binary wire format encoding options.
 *
 * With these two pieces of information in hand, the transport provides the critical mechanism by which your app can make network requests.
 *
 * To learn more about the two modes of transport, take a look at the npm package `@bufbuild/connect-web`.
 *
 * To get started with Connect-Query, simply import a transport (either `createConnectTransport` or `createGrpcWebTransport` from `@bufbuild/connect-web`) and pass it to the provider.
 *
 * @example
 * import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 * import { TransportProvider } from "@bufbuild/connect-query";
 *
 * const queryClient = new QueryClient();
 *
 * export const App() {
 *   const transport = createConnectTransport({
 *     baseUrl: "<your baseUrl here>",
 *   });
 *   return (
 *     <TransportProvider transport={transport}>
 *       <QueryClientProvider client={queryClient}>
 *          <YourApp />
 *       </QueryClientProvider>
 *     </TransportProvider>
 *   );
 * }
 */ const TransportProvider = ({ children , transport  })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(transportContext.Provider, {
        value: transport,
        children: children
    }); //# sourceMappingURL=use-transport.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;