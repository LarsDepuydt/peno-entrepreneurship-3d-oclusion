// @generated by protoc-gen-es v1.0.0
// @generated from file threedoclusion/v1/service.proto (package threedoclusion.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * TAGS
 *
 * @generated from message threedoclusion.v1.AddTagRequest
 */
export declare class AddTagRequest extends Message<AddTagRequest> {
  /**
   * @generated from field: string bite = 1;
   */
  bite: string;

  constructor(data?: PartialMessage<AddTagRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.AddTagRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddTagRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddTagRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddTagRequest;

  static equals(a: AddTagRequest | PlainMessage<AddTagRequest> | undefined, b: AddTagRequest | PlainMessage<AddTagRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.AddTagResponse
 */
export declare class AddTagResponse extends Message<AddTagResponse> {
  /**
   * @generated from field: string message = 1;
   */
  message: string;

  constructor(data?: PartialMessage<AddTagResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.AddTagResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddTagResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddTagResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddTagResponse;

  static equals(a: AddTagResponse | PlainMessage<AddTagResponse> | undefined, b: AddTagResponse | PlainMessage<AddTagResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.DeleteTagRequest
 */
export declare class DeleteTagRequest extends Message<DeleteTagRequest> {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  constructor(data?: PartialMessage<DeleteTagRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.DeleteTagRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTagRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTagRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTagRequest;

  static equals(a: DeleteTagRequest | PlainMessage<DeleteTagRequest> | undefined, b: DeleteTagRequest | PlainMessage<DeleteTagRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.DeleteTagResponse
 */
export declare class DeleteTagResponse extends Message<DeleteTagResponse> {
  /**
   * @generated from field: string message = 1;
   */
  message: string;

  constructor(data?: PartialMessage<DeleteTagResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.DeleteTagResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTagResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTagResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTagResponse;

  static equals(a: DeleteTagResponse | PlainMessage<DeleteTagResponse> | undefined, b: DeleteTagResponse | PlainMessage<DeleteTagResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetAllTagsRequest
 */
export declare class GetAllTagsRequest extends Message<GetAllTagsRequest> {
  /**
   * @generated from field: string table_name = 1;
   */
  tableName: string;

  constructor(data?: PartialMessage<GetAllTagsRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetAllTagsRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllTagsRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllTagsRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllTagsRequest;

  static equals(a: GetAllTagsRequest | PlainMessage<GetAllTagsRequest> | undefined, b: GetAllTagsRequest | PlainMessage<GetAllTagsRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetAllTagsResponse
 */
export declare class GetAllTagsResponse extends Message<GetAllTagsResponse> {
  /**
   * @generated from field: repeated int64 id_data = 1;
   */
  idData: bigint[];

  /**
   * @generated from field: repeated string bite_data = 2;
   */
  biteData: string[];

  constructor(data?: PartialMessage<GetAllTagsResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetAllTagsResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllTagsResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllTagsResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllTagsResponse;

  static equals(a: GetAllTagsResponse | PlainMessage<GetAllTagsResponse> | undefined, b: GetAllTagsResponse | PlainMessage<GetAllTagsResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetTagByIDRequest
 */
export declare class GetTagByIDRequest extends Message<GetTagByIDRequest> {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  constructor(data?: PartialMessage<GetTagByIDRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetTagByIDRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTagByIDRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTagByIDRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTagByIDRequest;

  static equals(a: GetTagByIDRequest | PlainMessage<GetTagByIDRequest> | undefined, b: GetTagByIDRequest | PlainMessage<GetTagByIDRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetTagByIDResponse
 */
export declare class GetTagByIDResponse extends Message<GetTagByIDResponse> {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: string bite = 2;
   */
  bite: string;

  constructor(data?: PartialMessage<GetTagByIDResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetTagByIDResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTagByIDResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTagByIDResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTagByIDResponse;

  static equals(a: GetTagByIDResponse | PlainMessage<GetTagByIDResponse> | undefined, b: GetTagByIDResponse | PlainMessage<GetTagByIDResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetAllTagsByTypeRequest
 */
export declare class GetAllTagsByTypeRequest extends Message<GetAllTagsByTypeRequest> {
  /**
   * @generated from field: string type = 1;
   */
  type: string;

  constructor(data?: PartialMessage<GetAllTagsByTypeRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetAllTagsByTypeRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllTagsByTypeRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllTagsByTypeRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllTagsByTypeRequest;

  static equals(a: GetAllTagsByTypeRequest | PlainMessage<GetAllTagsByTypeRequest> | undefined, b: GetAllTagsByTypeRequest | PlainMessage<GetAllTagsByTypeRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetAllTagsByTypeResponse
 */
export declare class GetAllTagsByTypeResponse extends Message<GetAllTagsByTypeResponse> {
  /**
   * @generated from field: string bite = 1;
   */
  bite: string;

  /**
   * @generated from field: repeated int64 id_data = 2;
   */
  idData: bigint[];

  constructor(data?: PartialMessage<GetAllTagsByTypeResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetAllTagsByTypeResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllTagsByTypeResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllTagsByTypeResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllTagsByTypeResponse;

  static equals(a: GetAllTagsByTypeResponse | PlainMessage<GetAllTagsByTypeResponse> | undefined, b: GetAllTagsByTypeResponse | PlainMessage<GetAllTagsByTypeResponse> | undefined): boolean;
}

/**
 * SCANS
 *
 * @generated from message threedoclusion.v1.AddScanRequest
 */
export declare class AddScanRequest extends Message<AddScanRequest> {
  /**
   * @generated from field: string scan_file = 1;
   */
  scanFile: string;

  /**
   * @generated from field: string scan_date = 2;
   */
  scanDate: string;

  constructor(data?: PartialMessage<AddScanRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.AddScanRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddScanRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddScanRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddScanRequest;

  static equals(a: AddScanRequest | PlainMessage<AddScanRequest> | undefined, b: AddScanRequest | PlainMessage<AddScanRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.AddScanResponse
 */
export declare class AddScanResponse extends Message<AddScanResponse> {
  /**
   * @generated from field: string message = 1;
   */
  message: string;

  constructor(data?: PartialMessage<AddScanResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.AddScanResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddScanResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddScanResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddScanResponse;

  static equals(a: AddScanResponse | PlainMessage<AddScanResponse> | undefined, b: AddScanResponse | PlainMessage<AddScanResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.DeleteScanRequest
 */
export declare class DeleteScanRequest extends Message<DeleteScanRequest> {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  constructor(data?: PartialMessage<DeleteScanRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.DeleteScanRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteScanRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteScanRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteScanRequest;

  static equals(a: DeleteScanRequest | PlainMessage<DeleteScanRequest> | undefined, b: DeleteScanRequest | PlainMessage<DeleteScanRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.DeleteScanResponse
 */
export declare class DeleteScanResponse extends Message<DeleteScanResponse> {
  /**
   * @generated from field: string message = 1;
   */
  message: string;

  constructor(data?: PartialMessage<DeleteScanResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.DeleteScanResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteScanResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteScanResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteScanResponse;

  static equals(a: DeleteScanResponse | PlainMessage<DeleteScanResponse> | undefined, b: DeleteScanResponse | PlainMessage<DeleteScanResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetAllScansRequest
 */
export declare class GetAllScansRequest extends Message<GetAllScansRequest> {
  /**
   * @generated from field: string table_name = 1;
   */
  tableName: string;

  constructor(data?: PartialMessage<GetAllScansRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetAllScansRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllScansRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllScansRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllScansRequest;

  static equals(a: GetAllScansRequest | PlainMessage<GetAllScansRequest> | undefined, b: GetAllScansRequest | PlainMessage<GetAllScansRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetAllScansResponse
 */
export declare class GetAllScansResponse extends Message<GetAllScansResponse> {
  /**
   * @generated from field: repeated int64 id_data = 1;
   */
  idData: bigint[];

  /**
   * @generated from field: repeated string scan_data = 2;
   */
  scanData: string[];

  /**
   * @generated from field: repeated string scan_dates = 3;
   */
  scanDates: string[];

  constructor(data?: PartialMessage<GetAllScansResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetAllScansResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllScansResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllScansResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllScansResponse;

  static equals(a: GetAllScansResponse | PlainMessage<GetAllScansResponse> | undefined, b: GetAllScansResponse | PlainMessage<GetAllScansResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetScanByIDRequest
 */
export declare class GetScanByIDRequest extends Message<GetScanByIDRequest> {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  constructor(data?: PartialMessage<GetScanByIDRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetScanByIDRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetScanByIDRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetScanByIDRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetScanByIDRequest;

  static equals(a: GetScanByIDRequest | PlainMessage<GetScanByIDRequest> | undefined, b: GetScanByIDRequest | PlainMessage<GetScanByIDRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetScanByIDResponse
 */
export declare class GetScanByIDResponse extends Message<GetScanByIDResponse> {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: string scan_data = 2;
   */
  scanData: string;

  /**
   * @generated from field: string scan_date = 3;
   */
  scanDate: string;

  constructor(data?: PartialMessage<GetScanByIDResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetScanByIDResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetScanByIDResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetScanByIDResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetScanByIDResponse;

  static equals(a: GetScanByIDResponse | PlainMessage<GetScanByIDResponse> | undefined, b: GetScanByIDResponse | PlainMessage<GetScanByIDResponse> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetScanByDateRequest
 */
export declare class GetScanByDateRequest extends Message<GetScanByDateRequest> {
  /**
   * @generated from field: string date = 1;
   */
  date: string;

  constructor(data?: PartialMessage<GetScanByDateRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetScanByDateRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetScanByDateRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetScanByDateRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetScanByDateRequest;

  static equals(a: GetScanByDateRequest | PlainMessage<GetScanByDateRequest> | undefined, b: GetScanByDateRequest | PlainMessage<GetScanByDateRequest> | undefined): boolean;
}

/**
 * @generated from message threedoclusion.v1.GetScanByDateResponse
 */
export declare class GetScanByDateResponse extends Message<GetScanByDateResponse> {
  /**
   * @generated from field: repeated int64 id_data = 1;
   */
  idData: bigint[];

  /**
   * @generated from field: repeated string scan_data = 2;
   */
  scanData: string[];

  /**
   * @generated from field: repeated string scan_dates = 3;
   */
  scanDates: string[];

  constructor(data?: PartialMessage<GetScanByDateResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "threedoclusion.v1.GetScanByDateResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetScanByDateResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetScanByDateResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetScanByDateResponse;

  static equals(a: GetScanByDateResponse | PlainMessage<GetScanByDateResponse> | undefined, b: GetScanByDateResponse | PlainMessage<GetScanByDateResponse> | undefined): boolean;
}

