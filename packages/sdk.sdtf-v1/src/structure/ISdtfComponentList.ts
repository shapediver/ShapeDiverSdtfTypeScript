import {
    ISdtfAccessor,
    ISdtfAsset,
    ISdtfAttributes,
    ISdtfBuffer,
    ISdtfBufferView,
    ISdtfChunk,
    ISdtfDataItem,
    ISdtfFileInfo,
    ISdtfNode,
    ISdtfTypeHint,
} from '@shapediver/sdk.sdtf-core';

/** Holds all component instances that represent a single sdTF file. */
export interface ISdtfComponentList {
    accessors: ISdtfAccessor[];

    asset: ISdtfAsset;

    attributes: ISdtfAttributes[];

    buffers: ISdtfBuffer[];

    bufferViews: ISdtfBufferView[];

    chunks: ISdtfChunk[];

    items: ISdtfDataItem[];

    nodes: ISdtfNode[];

    typeHints: ISdtfTypeHint[];

    fileInfo: ISdtfFileInfo;

    binaryBody?: ArrayBuffer;
}

/**
 * Holds all component instances that represent a single sdTF file.
 * These components are partial representations and must be validated to ensure data correctness.
 */
export interface ISdtfPartialComponentList {
    accessors: Partial<ISdtfAccessor>[];

    asset: Partial<ISdtfAsset>;

    attributes: Partial<ISdtfAttributes>[];

    buffers: Partial<ISdtfBuffer>[];

    bufferViews: Partial<ISdtfBufferView>[];

    chunks: Partial<ISdtfChunk>[];

    items: Partial<ISdtfDataItem>[];

    nodes: Partial<ISdtfNode>[];

    typeHints: Partial<ISdtfTypeHint>[];

    fileInfo: Partial<ISdtfFileInfo>;

    binaryBody?: ArrayBuffer;
}

/** Creates a sdTF JSON content object from the given component list. */
export function toJsonContent(componentList: ISdtfComponentList): Record<string, unknown> {
    const json = componentList.asset.toJson();
    json.asset = componentList.fileInfo.toJson();
    json.chunks = componentList.chunks.map((c) => c.toJson());
    json.nodes = componentList.nodes.map((n) => n.toJson());
    json.items = componentList.items.map((i) => i.toJson());
    json.attributes = componentList.attributes.map((a) => a.toJson());
    json.typeHints = componentList.typeHints.map((t) => t.toJson());
    json.accessors = componentList.accessors.map((a) => a.toJson());
    json.bufferViews = componentList.bufferViews.map((v) => v.toJson());
    json.buffers = componentList.buffers.map((b) => b.toJson());

    return json;
}
