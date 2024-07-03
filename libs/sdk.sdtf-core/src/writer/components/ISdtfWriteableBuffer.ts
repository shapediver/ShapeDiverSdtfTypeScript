import { ISdtfBuffer } from '../../structure/components/ISdtfBuffer';
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from './ISdtfBaseWriteableComponent';

/** Representation of a [sdTF buffer](https://github.com/shapediver/sdTF/tree/development/specification/1.0#buffers). */
export interface ISdtfWriteableBuffer
    extends ISdtfBaseWriteableComponent,
        SdtfWriteableBase<ISdtfBuffer> {
    /**
     * The data hold by this buffer.
     * Buffers will be merged and optimizes before they are written to an sdTF file.
     */
    data?: ArrayBuffer;

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>;
}
