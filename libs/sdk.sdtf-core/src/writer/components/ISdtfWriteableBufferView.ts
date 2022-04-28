import { ISdtfBufferView } from "../../structure/components/ISdtfBufferView"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"
import { ISdtfWriteableBuffer } from "./ISdtfWriteableBuffer"

/** Representation of a [sdTF buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferviews). */
export interface ISdtfWriteableBufferView extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfBufferView>, "buffer"> {

    /** The referenced buffer. */
    buffer?: ISdtfWriteableBuffer

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
