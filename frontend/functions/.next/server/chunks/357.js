"use strict";
exports.id = 357;
exports.ids = [357];
exports.modules = {

/***/ 8992:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ makeConnectQueryKeyGetter)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7464);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_0__]);
_utils__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * TanStack Query requires query keys in order to decide when the query should automatically update.
 *
 * In Connect-Query, much of this is handled automatically by this function.
 *
 * @see ConnectQueryKey for information on the components of Connect-Query's keys.
 */ const makeConnectQueryKeyGetter = (typeName, methodInfoName)=>(input)=>[
            typeName,
            methodInfoName,
            input === _utils__WEBPACK_IMPORTED_MODULE_0__/* .disableQuery */ .U2 || !input ? {} : input
        ]; //# sourceMappingURL=connect-query-key.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1795:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u4": () => (/* binding */ createQueryHooks)
/* harmony export */ });
/* unused harmony exports supportedMethodKinds, isSupportedMethod */
/* harmony import */ var _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5860);
/* harmony import */ var _unary_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8278);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7464);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__, _unary_hooks__WEBPACK_IMPORTED_MODULE_1__, _utils__WEBPACK_IMPORTED_MODULE_2__]);
([_bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__, _unary_hooks__WEBPACK_IMPORTED_MODULE_1__, _utils__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



/**
 * This is an array of supported `MethodKind`s
 */ const supportedMethodKinds = [
    _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__.MethodKind.Unary
];
/**
 * This predicate returns true if the service is a kind that's supported by Connect-Query.
 *
 * Today, only Unary services are supported.
 */ const isSupportedMethod = (method)=>{
    return supportedMethodKinds.includes(method.kind);
};
/**
 * Chances are, what you want to use is `createQueryService`.
 *
 * This helper creates the necessary hooks (stored in a object with one key for each method).
 *
 * It does not, however, provide any caching (like `createQueryService` does) which means that each time you call this function it will generate a fresh set of hooks, even if you call with the same service and transport.
 */ const createQueryHooks = ({ service: { typeName , methods  } , transport  })=>Object.entries(methods).reduce((accumulator, [localName, methodInfo])=>{
        switch(methodInfo.kind){
            case _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__.MethodKind.Unary:
                {
                    return {
                        ...accumulator,
                        [localName]: (0,_unary_hooks__WEBPACK_IMPORTED_MODULE_1__/* .unaryHooks */ .q)({
                            methodInfo,
                            typeName,
                            transport
                        })
                    };
                }
            case _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__.MethodKind.BiDiStreaming:
                // not implemented
                return accumulator;
            case _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__.MethodKind.ClientStreaming:
                // not implemented
                return accumulator;
            case _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__.MethodKind.ServerStreaming:
                // not implemented
                return accumulator;
            default:
                console.error((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .unreachableCase */ .UM)(methodInfo, `unrecognized method kind: ${methodInfo.kind}`));
                return accumulator;
        }
    }, // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter -- making this change causes the wrong overload to be selected
    {}); //# sourceMappingURL=create-query-hooks.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1962:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ createQueryService)
/* harmony export */ });
/* harmony import */ var _create_query_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1795);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_create_query_hooks__WEBPACK_IMPORTED_MODULE_0__]);
_create_query_hooks__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const servicesToHooks = new Map();
/**
 * `createQueryService` is the main entrypoint for Connect-Query.
 *
 * Pass in a service and you will receive an object with properties for each of your services and values that provide hooks for those services that you can then give to Tanstack Query.  The `ServiceType` TypeScript interface is provided by Protobuf-ES (`@bufbuild/protobuf`) while generated service definitions are provided by Connect-Web (`@bufbuild/connect-web`).
 *
 * `Transport` refers to the mechanism by which your client will make the actual network calls.  If you want to use a custom transport, you can optionally provide one with a call to `useTransport`, which Connect-Query exports.  Otherwise, the default transport from React context will be used.  This default transport is placed on React context by the `TransportProvider`. Whether you pass a custom transport or you use `TransportProvider`, in both cases you'll need to use one of `@bufbuild/connect-web`'s exports `createConnectTransport` or `createGrpcWebTransport`.
 *
 * Note that the most memory performant approach is to use the transport on React Context by using the `TransportProvider` because that provider is memoized by React, but also that any calls to `createQueryService` with the same service is cached by this function.
 *
 * @example
 *
 * export const { say } = createQueryService({
 *   service: {
 *     methods: {
 *       say: {
 *         name: "Say",
 *         kind: MethodKind.Unary,
 *         I: SayRequest,
 *         O: SayResponse,
 *       },
 *     },
 *     typeName: "buf.connect.demo.eliza.v1.ElizaService",
 *   },
 * });
 *
 * const { data, isLoading, ...etc } = useQuery(say.useQuery());
 */ const createQueryService = ({ service , transport  })=>{
    if (transport) {
        // custom transports are not cached
        return (0,_create_query_hooks__WEBPACK_IMPORTED_MODULE_0__/* .createQueryHooks */ .u4)({
            service,
            transport
        });
    }
    let hooks = servicesToHooks.get(service);
    if (!hooks) {
        hooks = (0,_create_query_hooks__WEBPACK_IMPORTED_MODULE_0__/* .createQueryHooks */ .u4)({
            service,
            transport
        });
        servicesToHooks.set(service, hooks);
    }
    return hooks;
}; //# sourceMappingURL=create-query-service.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ unaryFetch)
/* harmony export */ });
// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * This helper "puts all the pieces" together to make an actual network request for a unary method.
 */ const unaryFetch = async ({ callOptions , input ={} , methodInfo , transport , typeName  })=>{
    const response = await transport.unary({
        typeName,
        methods: {}
    }, methodInfo, callOptions?.signal, callOptions?.timeoutMs, callOptions?.headers, input);
    return response.message;
}; //# sourceMappingURL=fetch.js.map


/***/ }),

/***/ 8278:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ unaryHooks)
/* harmony export */ });
/* harmony import */ var _connect_query_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8992);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9860);
/* harmony import */ var _use_transport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5128);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7464);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_0__, _connect_query_key__WEBPACK_IMPORTED_MODULE_1__, _use_transport__WEBPACK_IMPORTED_MODULE_3__]);
([_utils__WEBPACK_IMPORTED_MODULE_0__, _connect_query_key__WEBPACK_IMPORTED_MODULE_1__, _use_transport__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




/**
 * A helper function that will configure the set of hooks a Unary method supports.
 */ const unaryHooks = ({ methodInfo , typeName , transport: topLevelCustomTransport  })=>{
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isUnaryMethod */ .dE)(methodInfo)) {
        throw (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .unreachableCase */ .UM)(methodInfo, `unaryHooks was passed a non unary method, ${methodInfo.name}`);
    }
    const getQueryKey = (0,_connect_query_key__WEBPACK_IMPORTED_MODULE_1__/* .makeConnectQueryKeyGetter */ .G)(typeName, methodInfo.name);
    const createUseQueryOptions = (input, { callOptions , getPlaceholderData , onError , transport  })=>{
        const enabled = input !== _utils__WEBPACK_IMPORTED_MODULE_0__/* .disableQuery */ .U2;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .hu)(transport !== undefined, "createUseQueryOptions requires you to provide a Transport.  If you want automatic inference of Transport, try using the useQuery helper.");
        return {
            enabled,
            ...getPlaceholderData ? {
                placeholderData: ()=>{
                    const placeholderData = getPlaceholderData(enabled);
                    if (placeholderData === undefined) {
                        return undefined;
                    }
                    return new methodInfo.O(placeholderData);
                }
            } : {},
            queryFn: async (context)=>{
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .hu)(enabled, "queryFn does not accept a disabled query");
                return (0,_fetch__WEBPACK_IMPORTED_MODULE_2__/* .unaryFetch */ .E)({
                    callOptions: callOptions ?? context,
                    input,
                    methodInfo,
                    transport,
                    typeName
                });
            },
            queryKey: getQueryKey(input),
            ...onError ? {
                onError
            } : {}
        };
    };
    return {
        createData: (input)=>new methodInfo.O(input),
        createUseQueryOptions,
        getPartialQueryKey: ()=>[
                typeName,
                methodInfo.name
            ],
        getQueryKey,
        methodInfo,
        setQueriesData: (updater)=>[
                [
                    typeName,
                    methodInfo.name
                ],
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .protobufSafeUpdater */ .Pl)(updater, methodInfo.O)
            ],
        setQueryData: (updater, input)=>[
                getQueryKey(input),
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .protobufSafeUpdater */ .Pl)(updater, methodInfo.O)
            ],
        useInfiniteQuery: (input, { transport: optionsTransport , getNextPageParam , pageParamKey , onError , callOptions  })=>{
            const contextTransport = (0,_use_transport__WEBPACK_IMPORTED_MODULE_3__/* .useTransport */ .EM)();
            const transport = optionsTransport ?? topLevelCustomTransport ?? contextTransport;
            return {
                enabled: input !== _utils__WEBPACK_IMPORTED_MODULE_0__/* .disableQuery */ .U2,
                getNextPageParam,
                queryFn: async (context)=>{
                    (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .hu)(input !== _utils__WEBPACK_IMPORTED_MODULE_0__/* .disableQuery */ .U2, "queryFn does not accept a disabled query");
                    return (0,_fetch__WEBPACK_IMPORTED_MODULE_2__/* .unaryFetch */ .E)({
                        callOptions: callOptions ?? context,
                        input: {
                            ...input,
                            [pageParamKey]: context.pageParam
                        },
                        methodInfo,
                        transport,
                        typeName
                    });
                },
                queryKey: getQueryKey(input),
                ...onError ? {
                    onError
                } : {}
            };
        },
        useMutation: ({ transport: optionsTransport , callOptions , onError  } = {})=>{
            const contextTransport = (0,_use_transport__WEBPACK_IMPORTED_MODULE_3__/* .useTransport */ .EM)();
            const transport = optionsTransport ?? topLevelCustomTransport ?? contextTransport;
            return {
                mutationFn: async (input, context)=>(0,_fetch__WEBPACK_IMPORTED_MODULE_2__/* .unaryFetch */ .E)({
                        callOptions: callOptions ?? context,
                        input,
                        methodInfo,
                        transport,
                        typeName
                    }),
                ...onError ? {
                    onError
                } : {}
            };
        },
        useQuery: (input, options = {})=>{
            const contextTransport = (0,_use_transport__WEBPACK_IMPORTED_MODULE_3__/* .useTransport */ .EM)();
            const transport = options.transport ?? topLevelCustomTransport ?? contextTransport;
            return createUseQueryOptions(input, {
                ...options,
                transport
            });
        }
    };
}; //# sourceMappingURL=unary-hooks.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7464:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pl": () => (/* binding */ protobufSafeUpdater),
/* harmony export */   "U2": () => (/* binding */ disableQuery),
/* harmony export */   "UM": () => (/* binding */ unreachableCase),
/* harmony export */   "dE": () => (/* binding */ isUnaryMethod),
/* harmony export */   "hu": () => (/* binding */ assert)
/* harmony export */ });
/* unused harmony export isAbortController */
/* harmony import */ var _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5860);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__]);
_bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Pass this value as an input to signal that you want to disable the query.
 */ const disableQuery = Symbol("disableQuery");
/**
 * Throws an error with the provided message when the condition is `false`
 */ function assert(condition, message) {
    if (!condition) {
        throw new Error(`Invalid assertion: ${message}`);
    }
}
/**
 * Verifies that the provided input is a valid AbortController
 */ const isAbortController = (input)=>{
    if (typeof input === "object" && input !== null && "signal" in input && typeof input.signal === "object" && input.signal !== null && "aborted" in input.signal && typeof input.signal.aborted === "boolean" && "abort" in input && typeof input.abort === "function") {
        return true;
    }
    return false;
};
/**
 * Type guards that the given method is a unary method
 */ const isUnaryMethod = (methodInfo)=>methodInfo.kind === _bufbuild_protobuf__WEBPACK_IMPORTED_MODULE_0__.MethodKind.Unary;
/**
 * Creates (but does not throw) an error to assert that a provided case is unreachable.
 */ const unreachableCase = (_, message)=>new Error(`Invariant failed: ${message}`);
/**
 * This helper makes sure that the Class for the original data is returned, even if what's provided is a partial message or a plain JavaScript object representing the underlying values.
 */ const protobufSafeUpdater = (updater, Output)=>(prev)=>{
        if (typeof updater === "function") {
            return new Output(updater(prev));
        }
        return new Output(updater);
    }; //# sourceMappingURL=utils.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;