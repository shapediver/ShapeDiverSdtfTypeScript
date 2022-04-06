import { ISdDtfBufferView } from "../../structure/components/ISdDtfBufferView"
import { ISdDtfBaseReadableComponent, SdDtfReadableBase } from "./ISdDtfBaseReadableComponent"
import { ISdDtfReadableBuffer } from "./ISdDtfReadableBuffer"

/** Representation of a [sdTF buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferviews). */
export interface ISdDtfReadableBufferView extends ISdDtfBaseReadableComponent,
    Omit<SdDtfReadableBase<ISdDtfBufferView>, "buffer"> {

    /** The referenced buffer. */
    buffer: ISdDtfReadableBuffer

    /** Returns the buffer content. */
    getContent (): Promise<DataView>

}
