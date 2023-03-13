// @generated by protoc-gen-connect-es v0.8.3 with parameter "target=ts"
// @generated from file threedoclusion/v1/service.proto (package threedoclusion.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

<<<<<<< HEAD
import { AddScanRequest, AddScanResponse, AddTagRequest, AddTagResponse, DeleteScanRequest, DeleteScanResponse, DeleteTagRequest, DeleteTagResponse, GetAllScansRequest, GetAllScansResponse, GetAllTagsByTypeRequest, GetAllTagsByTypeResponse, GetAllTagsRequest, GetAllTagsResponse, GetScanByDateRequest, GetScanByDateResponse, GetScanByIDRequest, GetScanByIDResponse, GetTagByIDRequest, GetTagByIDResponse, SendVRRequest, SendVRResponse, WaitingRequest, WaitingResponse } from "./service_pb.js";
=======
import { AddPatientRequest, AddPatientResponse, AddScanRequest, AddScanResponse, AddTagRequest, AddTagResponse, DeletePatientRequest, DeletePatientResponse, DeleteScanRequest, DeleteScanResponse, DeleteTagRequest, DeleteTagResponse, GetAllPatientsRequest, GetAllPatientsResponse, GetAllScansRequest, GetAllScansResponse, GetAllTagsByTypeRequest, GetAllTagsByTypeResponse, GetAllTagsRequest, GetAllTagsResponse, GetPatientByIDRequest, GetPatientByIDResponse, GetPatientByNameRequest, GetPatientByNameResponse, GetScanByDateRequest, GetScanByDateResponse, GetScanByIDRequest, GetScanByIDResponse, GetTagByIDRequest, GetTagByIDResponse } from "./service_pb.js";
>>>>>>> PasswordHashing
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service threedoclusion.v1.ScanService
 */
export const ScanService = {
  typeName: "threedoclusion.v1.ScanService",
  methods: {
    /**
     * @generated from rpc threedoclusion.v1.ScanService.SendVR
     */
    sendVR: {
      name: "SendVR",
      I: SendVRRequest,
      O: SendVRResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.Waiting
     */
    waiting: {
      name: "Waiting",
      I: WaitingRequest,
      O: WaitingResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.AddScan
     */
    addScan: {
      name: "AddScan",
      I: AddScanRequest,
      O: AddScanResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.DeleteScan
     */
    deleteScan: {
      name: "DeleteScan",
      I: DeleteScanRequest,
      O: DeleteScanResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetAllScans
     */
    getAllScans: {
      name: "GetAllScans",
      I: GetAllScansRequest,
      O: GetAllScansResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetScanByID
     */
    getScanByID: {
      name: "GetScanByID",
      I: GetScanByIDRequest,
      O: GetScanByIDResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetScanByDate
     */
    getScanByDate: {
      name: "GetScanByDate",
      I: GetScanByDateRequest,
      O: GetScanByDateResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.AddTag
     */
    addTag: {
      name: "AddTag",
      I: AddTagRequest,
      O: AddTagResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.DeleteTag
     */
    deleteTag: {
      name: "DeleteTag",
      I: DeleteTagRequest,
      O: DeleteTagResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetAllTags
     */
    getAllTags: {
      name: "GetAllTags",
      I: GetAllTagsRequest,
      O: GetAllTagsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetTagByID
     */
    getTagByID: {
      name: "GetTagByID",
      I: GetTagByIDRequest,
      O: GetTagByIDResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetAllTagsByType
     */
    getAllTagsByType: {
      name: "GetAllTagsByType",
      I: GetAllTagsByTypeRequest,
      O: GetAllTagsByTypeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.AddPatient
     */
    addPatient: {
      name: "AddPatient",
      I: AddPatientRequest,
      O: AddPatientResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.DeletePatient
     */
    deletePatient: {
      name: "DeletePatient",
      I: DeletePatientRequest,
      O: DeletePatientResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetAllPatients
     */
    getAllPatients: {
      name: "GetAllPatients",
      I: GetAllPatientsRequest,
      O: GetAllPatientsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetPatientByID
     */
    getPatientByID: {
      name: "GetPatientByID",
      I: GetPatientByIDRequest,
      O: GetPatientByIDResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc threedoclusion.v1.ScanService.GetPatientByName
     */
    getPatientByName: {
      name: "GetPatientByName",
      I: GetPatientByNameRequest,
      O: GetPatientByNameResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

