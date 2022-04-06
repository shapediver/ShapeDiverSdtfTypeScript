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

    /** Instantiates a new readable accessor object and sets the given data when the respective types are correct. */
    createReadableAccessor (accessor: ISdDtfAccessor, bufferViews: ISdDtfReadableBufferView[]): ISdDtfReadableAccessor

    /** Instantiates a new readable attributes object and sets the given data when the respective types are correct. */
    createAttribute (
        attribute: ISdDtfAttributes,
        accessors: ISdDtfReadableAccessor[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableAttributes

    /** Instantiates a new readable buffer object and sets the given data when the respective types are correct. */
    createReadableBuffer (buffer: ISdDtfBuffer): ISdDtfReadableBuffer

    /** Instantiates a new readable buffer view object and sets the given data when the respective types are correct. */
    createReadableBufferView (bufferView: ISdDtfBufferView, buffers: ISdDtfReadableBuffer[]): ISdDtfReadableBufferView

    /** Instantiates a new readable chunk object and sets the given data when the respective types are correct. */
    createReadableChunk (
        chunk: ISdDtfChunk,
        attributes: ISdDtfReadableAttributes[],
        dataItems: ISdDtfReadableDataItem[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableChunk

    /** Instantiates a new readable data item object and sets the given data when the respective types are correct. */
    createReadableDataItem (
        dataItem: ISdDtfDataItem,
        accessors: ISdDtfReadableAccessor[],
        attributes: ISdDtfReadableAttributes[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableDataItem

    /** Instantiates a new readable file info object and sets the given data when the respective types are correct. */
    createReadableFileInfo (fileInfo: ISdDtfFileInfo): ISdDtfReadableFileInfo

    /**
     * Instantiates a new readable node object and sets the given data when the respective types are correct.
     *
     * WARNING: Nodes referencing other nodes are not processed here!
     */
    createReadableNode (
        node: ISdDtfNode,
        attributes: ISdDtfReadableAttributes[],
        dataItems: ISdDtfReadableDataItem[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableNode

    /** Instantiates a new readable type hint object and sets the given data when the respective types are correct. */
    createReadableTypeHint (typeHint: ISdDtfTypeHint): ISdDtfReadableTypeHint

    /** Links references from chunk to node components. */
    setChunkReferences (readableChunks: ISdDtfReadableChunk[], chunks: ISdDtfChunk[], readableNodes: ISdDtfReadableNode[]): void

    /** Links references between node components. */
    setNodeReferences (readableNodes: ISdDtfReadableNode[], nodes: ISdDtfNode[]): void

}
