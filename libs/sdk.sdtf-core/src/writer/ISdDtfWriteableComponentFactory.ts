import { SdDtfTypeHintName } from "../structure/SdDtfShapeDiverTypeHints"
import { ISdDtfWriteableAccessor } from "./components/ISdDtfWriteableAccessor"
import { ISdDtfWriteableAsset } from "./components/ISdDtfWriteableAsset"
import { ISdDtfWriteableAttribute, ISdDtfWriteableAttributes } from "./components/ISdDtfWriteableAttributes"
import { ISdDtfWriteableBuffer } from "./components/ISdDtfWriteableBuffer"
import { ISdDtfWriteableBufferView } from "./components/ISdDtfWriteableBufferView"
import { ISdDtfWriteableChunk } from "./components/ISdDtfWriteableChunk"
import { ISdDtfWriteableDataItem } from "./components/ISdDtfWriteableDataItem"
import { ISdDtfWriteableNode } from "./components/ISdDtfWriteableNode"
import { ISdDtfWriteableTypeHint } from "./components/ISdDtfWriteableTypeHint"

/** Creates instances of individual writeable components. */
export interface ISdDtfWriteableComponentFactory {

    /**
     * Instantiates a new writeable accessor object.
     * When {@link content} is given, new {@link ISdDtfWriteableBufferView} and {@link ISdDtfWriteableBuffer} are created
     * and linked as well.
     */
    createAccessor (content?: { data: ArrayBuffer, contentType: string }): ISdDtfWriteableAccessor

    /** Instantiates a new writeable asset object and sets sdTF file information. */
    createAsset (): ISdDtfWriteableAsset

    /**
     * Instantiates a new writeable attributes object.
     * @hen
     */
    createAttribute (
        content?: unknown | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdDtfWriteableAttribute

    /**
     * Instantiates a new writeable attributes object.
     * @param content - Dictionary of attribute's where `key` represents an attribute name and `value` contains the
     * attribute's `value` and `type hint`.
     */
    createAttributes (
        content?: Record<string, [ value: unknown | { data: ArrayBuffer, contentType: string }, typeHint?: string ]>,
    ): ISdDtfWriteableAttributes

    /** Instantiates a new writeable buffer object. */
    createBuffer (data?: ArrayBuffer): ISdDtfWriteableBuffer

    /**
     * Instantiates a new writeable buffer view object.
     * When {@link content} is given, a new {@link ISdDtfWriteableBuffer} is created and linked as well.
     */
    createBufferView (content?: { data: ArrayBuffer, contentType: string }): ISdDtfWriteableBufferView

    /** Instantiates a new writeable chunk object. */
    createChunk (name?: string): ISdDtfWriteableChunk

    /** Instantiates a new writeable data item object. */
    createDataItem (
        content?: unknown | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdDtfWriteableDataItem

    /** Instantiates a new writeable node object. */
    createNode (): ISdDtfWriteableNode

    /** Instantiates a new writeable type hint object. */
    createTypeHint (name?: SdDtfTypeHintName | string): ISdDtfWriteableTypeHint

}
