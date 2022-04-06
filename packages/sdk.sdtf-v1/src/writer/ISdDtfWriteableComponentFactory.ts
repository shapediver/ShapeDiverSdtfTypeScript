import {
    ISdDtfWriteableAccessor,
    ISdDtfWriteableAsset,
    ISdDtfWriteableAttribute,
    ISdDtfWriteableAttributes,
    ISdDtfWriteableBuffer,
    ISdDtfWriteableBufferView,
    ISdDtfWriteableChunk,
    ISdDtfWriteableDataItem,
    ISdDtfWriteableNode,
    ISdDtfWriteableTypeHint,
    SdDtfTypeHintName,
} from "@shapediver/sdk.sdtf-core"

/** Creates instances of individual writeable components. */
export interface ISdDtfWriteableComponentFactory {

    /**
     * Instantiates a new writeable accessor object.
     * When `bufferData` is given, new {@link ISdDtfWriteableBufferView} and {@link ISdDtfWriteableBuffer} are created
     * and linked as well.
     */
    createAccessor (bufferData?: ArrayBuffer): ISdDtfWriteableAccessor

    /** Instantiates a new writeable asset object and sets sdTF file information. */
    createAsset (): ISdDtfWriteableAsset

    /** Instantiates a new writeable attributes object. */
    createAttribute (value?: unknown, typeHint?: string): ISdDtfWriteableAttribute

    /**
     * Instantiates a new writeable attributes object.
     * @param content Dictionary of attribute's where `key` represents an attribute name and `value` contains the
     * attribute's `value` and `type hint`.
     */
    createAttributes (content?: Record<string, [ value: unknown, typeHint?: string ]>): ISdDtfWriteableAttributes

    /** Instantiates a new writeable buffer object. */
    createBuffer (data?: ArrayBuffer): ISdDtfWriteableBuffer

    /**
     * Instantiates a new writeable buffer view object.
     * When `bufferData` is given, a new {@link ISdDtfWriteableBuffer} is created and linked as well.
     */
    createBufferView (bufferData?: ArrayBuffer): ISdDtfWriteableBufferView

    /** Instantiates a new writeable chunk object. */
    createChunk (name?: string): ISdDtfWriteableChunk

    /** Instantiates a new writeable data item object. */
    createDataItem (value?: unknown, typeHint?: string): ISdDtfWriteableDataItem

    /** Instantiates a new writeable node object. */
    createNode (): ISdDtfWriteableNode

    /** Instantiates a new writeable type hint object. */
    createTypeHint (name?: SdDtfTypeHintName | string): ISdDtfWriteableTypeHint

}
