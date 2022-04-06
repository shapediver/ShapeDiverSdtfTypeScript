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

    binaryBody?: ArrayBuffer

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

    binaryBody?: ArrayBuffer

}

/** Creates a sdTF JSON content object from the given component list. */
export function toJsonContent (componentList: ISdDtfComponentList): Record<string, unknown> {
    const json = componentList.asset.toJson()
    json.asset = componentList.fileInfo.toJson()
    json.chunks = componentList.chunks.map(c => c.toJson())
    json.nodes = componentList.nodes.map(n => n.toJson())
    json.items = componentList.items.map(i => i.toJson())
    json.attributes = componentList.attributes.map(a => a.toJson())
    json.typeHints = componentList.typeHints.map(t => t.toJson())
    json.accessors = componentList.accessors.map(a => a.toJson())
    json.bufferViews = componentList.bufferViews.map(v => v.toJson())
    json.buffers = componentList.buffers.map(b => b.toJson())

    return json
}
