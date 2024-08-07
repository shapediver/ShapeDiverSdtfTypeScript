import { ISdtfBuffer } from '../../structure/components/ISdtfBuffer';
import { ISdtfBaseReadableComponent, SdtfReadableBase } from './ISdtfBaseReadableComponent';

/** Representation of a [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffers). */
export interface ISdtfReadableBuffer
    extends ISdtfBaseReadableComponent,
        SdtfReadableBase<ISdtfBuffer> {
    /**
     * Returns the specified part of the buffer.
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdtfError} when the requested part is out of bounds.
     */
    getContent(offset: number, length: number): Promise<DataView>;
}
