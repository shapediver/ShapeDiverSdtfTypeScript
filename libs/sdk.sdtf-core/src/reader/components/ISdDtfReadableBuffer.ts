import { ISdDtfBuffer } from "../../structure/components/ISdDtfBuffer"
import { ISdDtfReadableBaseComponent, SdDtfReadableBase } from "./ISdDtfReadableBaseComponent"

/** Representation of a [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffers). */
export interface ISdDtfReadableBuffer extends ISdDtfReadableBaseComponent,
    SdDtfReadableBase<ISdDtfBuffer> {

    /**
     * Returns the specified part of the buffer.
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdDtfError} when the requested part is out of bounds.
     */
    getContent (offset: number, length: number): Promise<DataView>

}
