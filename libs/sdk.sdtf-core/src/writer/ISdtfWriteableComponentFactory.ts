import { SdtfTypeHintName } from "../structure/SdtfShapeDiverTypeHints"
import { ISdtfWriteableAccessor } from "./components/ISdtfWriteableAccessor"
import { ISdtfWriteableAsset } from "./components/ISdtfWriteableAsset"
import { ISdtfWriteableAttribute, ISdtfWriteableAttributes } from "./components/ISdtfWriteableAttributes"
import { ISdtfWriteableBuffer } from "./components/ISdtfWriteableBuffer"
import { ISdtfWriteableBufferView } from "./components/ISdtfWriteableBufferView"
import { ISdtfWriteableChunk } from "./components/ISdtfWriteableChunk"
import { ISdtfWriteableDataItem } from "./components/ISdtfWriteableDataItem"
import { ISdtfWriteableNode } from "./components/ISdtfWriteableNode"
import { ISdtfWriteableTypeHint } from "./components/ISdtfWriteableTypeHint"

/** Creates instances of individual writeable components. */
export interface ISdtfWriteableComponentFactory {

    /**
     * Instantiates a new writeable accessor object.
     * When {@link content} is given, new {@link ISdtfWriteableBufferView} and {@link ISdtfWriteableBuffer} are created
     * and linked as well.
     */
    createAccessor (content?: { data: ArrayBuffer, contentType: string }): ISdtfWriteableAccessor

    /** Instantiates a new writeable asset object and sets sdTF file information. */
    createAsset (): ISdtfWriteableAsset

    /**
     * Instantiates a new writeable attributes object.
     * @hen
     */
    createAttribute<T> (
        content?: Exclude<T, ArrayBuffer> | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdtfWriteableAttribute

    /**
     * Instantiates a new writeable attributes object.
     * @param content - Dictionary of attribute's where `key` represents an attribute name and `value` contains the
     * attribute's `value` and `type hint`.
     */
    createAttributes<T> (
        content?: Record<string, [ value: Exclude<T, ArrayBuffer> | { data: ArrayBuffer, contentType: string }, typeHint?: string ]>,
    ): ISdtfWriteableAttributes

    /** Instantiates a new writeable buffer object. */
    createBuffer (data?: ArrayBuffer): ISdtfWriteableBuffer

    /**
     * Instantiates a new writeable buffer view object.
     * When {@link content} is given, a new {@link ISdtfWriteableBuffer} is created and linked as well.
     */
    createBufferView (content?: { data: ArrayBuffer, contentType: string }): ISdtfWriteableBufferView

    /** Instantiates a new writeable chunk object. */
    createChunk (name?: string): ISdtfWriteableChunk

    /** Instantiates a new writeable data item object. */
    createDataItem<T> (
        content?: Exclude<T, ArrayBuffer> | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdtfWriteableDataItem

    /** Instantiates a new writeable node object. */
    createNode (): ISdtfWriteableNode

    /** Instantiates a new writeable type hint object. */
    createTypeHint (name?: SdtfTypeHintName | string): ISdtfWriteableTypeHint

}
