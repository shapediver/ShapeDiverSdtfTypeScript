import {
    ISdDtfReadableAccessor,
    ISdDtfReadableAsset,
    ISdDtfReadableAttributes,
    ISdDtfReadableBuffer,
    ISdDtfReadableBufferView,
    ISdDtfReadableChunk,
    ISdDtfReadableContentComponent,
    ISdDtfReadableDataItem,
    ISdDtfReadableFileInfo,
    ISdDtfReadableNode,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"

export interface ISdDtfReadableComponentList {

    accessors: ISdDtfReadableAccessor[]

    asset: ISdDtfReadableAsset

    attributes: ISdDtfReadableAttributes[]

    buffers: ISdDtfReadableBuffer[]

    bufferViews: ISdDtfReadableBufferView[]

    chunks: ISdDtfReadableChunk[]

    items: (ISdDtfReadableDataItem & ISdDtfReadableContentComponent)[]

    nodes: ISdDtfReadableNode[]

    typeHints: ISdDtfReadableTypeHint[]

    fileInfo: ISdDtfReadableFileInfo

}

export function readableComponentListFromAsset (asset: ISdDtfReadableAsset): ISdDtfReadableComponentList {
    return {
        accessors: asset.accessors,
        asset: asset,
        attributes: asset.attributes,
        buffers: asset.buffers,
        bufferViews: asset.bufferViews,
        chunks: asset.chunks,
        items: asset.items,
        nodes: asset.nodes,
        typeHints: asset.typeHints,
        fileInfo: asset.fileInfo,
    }
}
