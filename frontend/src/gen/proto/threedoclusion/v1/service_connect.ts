// @generated by protoc-gen-connect-es v0.8.1 with parameter "target=ts"
// @generated from file threedoclusion/v1/service.proto (package threedoclusion.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ScanRequest, ScanResponse } from "./service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service threedoclusion.v1.ScanService
 */
export const ScanService = {
  typeName: "threedoclusion.v1.ScanService",
  methods: {
    /**
     * @generated from rpc threedoclusion.v1.ScanService.Scan
     */
    scan: {
      name: "Scan",
      I: ScanRequest,
      O: ScanResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
