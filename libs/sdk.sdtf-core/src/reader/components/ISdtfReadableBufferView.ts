import { ISdtfBufferView } from '../../structure/components/ISdtfBufferView';
import { ISdtfBaseReadableComponent, SdtfReadableBase } from './ISdtfBaseReadableComponent';
import { ISdtfReadableBuffer } from './ISdtfReadableBuffer';

/** Representation of a [sdTF buffer view](https://github.com/shapediver/sdTF/tree/development/specification/1.0#bufferviews). */
export interface ISdtfReadableBufferView
    extends ISdtfBaseReadableComponent,
        Omit<SdtfReadableBase<ISdtfBufferView>, 'buffer'> {
    /** The referenced buffer. */
    buffer: ISdtfReadableBuffer;

    /** Returns the buffer content. */
    getContent(): Promise<DataView>;
}
