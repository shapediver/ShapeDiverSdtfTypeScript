import { ISdDtfBufferView } from "../../structure/components/ISdDtfBufferView"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"
import { ISdDtfWriteableBuffer } from "./ISdDtfWriteableBuffer"

/** Representation of a [sdTF buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferviews). */
export interface ISdDtfWriteableBufferView extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfBufferView>, "buffer"> {

    /** The referenced buffer. */
    buffer?: ISdDtfWriteableBuffer

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
