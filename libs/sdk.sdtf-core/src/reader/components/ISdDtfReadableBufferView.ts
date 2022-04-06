import { ISdDtfBuffer } from "../../structure/components/ISdDtfBuffer"
import { ISdDtfReadableBaseComponent, SdDtfReadableBase } from "./ISdDtfReadableBaseComponent"
import { ISdDtfReadableBuffer } from "./ISdDtfReadableBuffer"

/** Representation of a [sdTF buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferviews). */
export interface ISdDtfReadableBufferView extends ISdDtfReadableBaseComponent,
    Omit<SdDtfReadableBase<ISdDtfBuffer>, "buffer"> {

    /** The referenced buffer. */
    buffer: ISdDtfReadableBuffer

    /** Returns the buffer content. */
    getContent (): Promise<DataView>

}
