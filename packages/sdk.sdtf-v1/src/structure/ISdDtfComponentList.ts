import {
    ISdDtfAccessor,
    ISdDtfAsset,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"

/** Holds all component instances that represent a single sdTF file. */
export interface ISdDtfComponentList {

    accessors: ISdDtfAccessor[]

    asset: ISdDtfAsset

    attributes: ISdDtfAttributes[]

    buffers: ISdDtfBuffer[]

    bufferViews: ISdDtfBufferView[]

    chunks: ISdDtfChunk[]

    items: ISdDtfDataItem[]

    nodes: ISdDtfNode[]

    typeHints: ISdDtfTypeHint[]

    fileInfo: ISdDtfFileInfo

}

/**
 * Holds all component instances that represent a single sdTF file.
 * These components are partial representations and must be validated to ensure data correctness.
 */
export interface ISdDtfPartialComponentList {

    accessors: Partial<ISdDtfAccessor>[]

    asset: Partial<ISdDtfAsset>

    attributes: Partial<ISdDtfAttributes>[]

    buffers: Partial<ISdDtfBuffer>[]

    bufferViews: Partial<ISdDtfBufferView>[]

    chunks: Partial<ISdDtfChunk>[]

    items: Partial<ISdDtfDataItem>[]

    nodes: Partial<ISdDtfNode>[]

    typeHints: Partial<ISdDtfTypeHint>[]

    fileInfo: Partial<ISdDtfFileInfo>

}
