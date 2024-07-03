import {
    ISdtfAccessor,
    ISdtfAttributes,
    ISdtfBuffer,
    ISdtfBufferView,
    ISdtfChunk,
    ISdtfDataItem,
    ISdtfFileInfo,
    ISdtfNode,
    ISdtfReadableAccessor,
    ISdtfReadableAttributes,
    ISdtfReadableBuffer,
    ISdtfReadableBufferView,
    ISdtfReadableChunk,
    ISdtfReadableDataItem,
    ISdtfReadableFileInfo,
    ISdtfReadableNode,
    ISdtfReadableTypeHint,
    ISdtfTypeHint,
} from '@shapediver/sdk.sdtf-core';

/**
 * Creates instances of individual readable components.
 * Replaces ID-references between components with object references.
 */
export interface ISdtfReadableComponentFactory {
    /** Instantiates a new readable accessor object. */
    createAccessor(
        accessor: ISdtfAccessor,
        bufferViews: ISdtfReadableBufferView[]
    ): ISdtfReadableAccessor;

    /** Instantiates a new readable attributes object. */
    createAttributes(
        attribute: ISdtfAttributes,
        accessors: ISdtfReadableAccessor[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableAttributes;

    /** Instantiates a new readable buffer object. */
    createBuffer(buffer: ISdtfBuffer): ISdtfReadableBuffer;

    /** Instantiates a new readable buffer view object. */
    createBufferView(
        bufferView: ISdtfBufferView,
        buffers: ISdtfReadableBuffer[]
    ): ISdtfReadableBufferView;

    /** Instantiates a new readable chunk object. */
    createChunk(
        chunk: ISdtfChunk,
        attributes: ISdtfReadableAttributes[],
        dataItems: ISdtfReadableDataItem[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableChunk;

    /** Instantiates a new readable data item object. */
    createDataItem(
        dataItem: ISdtfDataItem,
        accessors: ISdtfReadableAccessor[],
        attributes: ISdtfReadableAttributes[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableDataItem;

    /** Instantiates a new readable file info object. */
    createFileInfo(fileInfo: ISdtfFileInfo): ISdtfReadableFileInfo;

    /**
     * Instantiates a new readable node object.
     *
     * WARNING: Nodes referencing other nodes are not processed here!
     */
    createNode(
        node: ISdtfNode,
        attributes: ISdtfReadableAttributes[],
        dataItems: ISdtfReadableDataItem[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableNode;

    /** Instantiates a new readable type hint object. */
    createTypeHint(typeHint: ISdtfTypeHint): ISdtfReadableTypeHint;

    /** Links references from chunk to node components. */
    setChunkReferences(
        readableChunks: ISdtfReadableChunk[],
        chunks: ISdtfChunk[],
        readableNodes: ISdtfReadableNode[]
    ): void;

    /** Links references between node components. */
    setNodeReferences(readableNodes: ISdtfReadableNode[], nodes: ISdtfNode[]): void;
}
