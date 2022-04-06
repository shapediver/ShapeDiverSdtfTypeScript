import {
    ISdDtfAccessor,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfReadableAccessor,
    ISdDtfReadableAttributes,
    ISdDtfReadableBuffer,
    ISdDtfReadableBufferView,
    ISdDtfReadableChunk,
    ISdDtfReadableDataItem,
    ISdDtfReadableFileInfo,
    ISdDtfReadableNode,
    ISdDtfReadableTypeHint,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"

/**
 * Creates instances of individual readable components.
 * Replaces ID-references between components with object references.
 */
export interface ISdDtfReadableComponentFactory {

    /** Instantiates a new readable accessor object. */
    createAccessor (accessor: ISdDtfAccessor, bufferViews: ISdDtfReadableBufferView[]): ISdDtfReadableAccessor

    /** Instantiates a new readable attributes object. */
    createAttributes (
        attribute: ISdDtfAttributes,
        accessors: ISdDtfReadableAccessor[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableAttributes

    /** Instantiates a new readable buffer object. */
    createBuffer (buffer: ISdDtfBuffer): ISdDtfReadableBuffer

    /** Instantiates a new readable buffer view object. */
    createBufferView (bufferView: ISdDtfBufferView, buffers: ISdDtfReadableBuffer[]): ISdDtfReadableBufferView

    /** Instantiates a new readable chunk object. */
    createChunk (
        chunk: ISdDtfChunk,
        attributes: ISdDtfReadableAttributes[],
        dataItems: ISdDtfReadableDataItem[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableChunk

    /** Instantiates a new readable data item object. */
    createDataItem (
        dataItem: ISdDtfDataItem,
        accessors: ISdDtfReadableAccessor[],
        attributes: ISdDtfReadableAttributes[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableDataItem

    /** Instantiates a new readable file info object. */
    createFileInfo (fileInfo: ISdDtfFileInfo): ISdDtfReadableFileInfo

    /**
     * Instantiates a new readable node object.
     *
     * WARNING: Nodes referencing other nodes are not processed here!
     */
    createNode (
        node: ISdDtfNode,
        attributes: ISdDtfReadableAttributes[],
        dataItems: ISdDtfReadableDataItem[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableNode

    /** Instantiates a new readable type hint object. */
    createTypeHint (typeHint: ISdDtfTypeHint): ISdDtfReadableTypeHint

    /** Links references from chunk to node components. */
    setChunkReferences (readableChunks: ISdDtfReadableChunk[], chunks: ISdDtfChunk[], readableNodes: ISdDtfReadableNode[]): void

    /** Links references between node components. */
    setNodeReferences (readableNodes: ISdDtfReadableNode[], nodes: ISdDtfNode[]): void

}
