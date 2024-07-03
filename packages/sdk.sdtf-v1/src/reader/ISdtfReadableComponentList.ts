import {
    ISdtfReadableAccessor,
    ISdtfReadableAsset,
    ISdtfReadableAttributes,
    ISdtfReadableBuffer,
    ISdtfReadableBufferView,
    ISdtfReadableChunk,
    ISdtfReadableContentComponent,
    ISdtfReadableDataItem,
    ISdtfReadableFileInfo,
    ISdtfReadableNode,
    ISdtfReadableTypeHint,
} from '@shapediver/sdk.sdtf-core';

export interface ISdtfReadableComponentList {
    accessors: ISdtfReadableAccessor[];

    asset: ISdtfReadableAsset;

    attributes: ISdtfReadableAttributes[];

    buffers: ISdtfReadableBuffer[];

    bufferViews: ISdtfReadableBufferView[];

    chunks: ISdtfReadableChunk[];

    items: (ISdtfReadableDataItem & ISdtfReadableContentComponent)[];

    nodes: ISdtfReadableNode[];

    typeHints: ISdtfReadableTypeHint[];

    fileInfo: ISdtfReadableFileInfo;
}

export function readableComponentListFromAsset(
    asset: ISdtfReadableAsset
): ISdtfReadableComponentList {
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
    };
}
