import { ISdtfWriteableBuffer, ISdtfWriteableBufferView } from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';
import { SdtfWriteableBuffer } from './SdtfWriteableBuffer';

export class SdtfWriteableBufferView
    extends SdtfBaseWriteableComponent
    implements ISdtfWriteableBufferView
{
    buffer?: ISdtfWriteableBuffer;
    byteLength?: number;
    byteOffset?: number;
    contentEncoding?: string;
    contentType?: string;
    name?: string;

    additionalProperties: Record<string, unknown> = {};

    static clone(orig: ISdtfWriteableBufferView): ISdtfWriteableBufferView {
        const clone = new SdtfWriteableBufferView();

        if (orig.buffer) clone.buffer = SdtfWriteableBuffer.clone(orig.buffer);
        clone.byteLength = orig.byteLength;
        clone.byteOffset = orig.byteOffset;
        clone.contentEncoding = orig.contentEncoding;
        clone.contentType = orig.contentType;
        clone.name = orig.name;

        clone.additionalProperties = { ...orig.additionalProperties };

        return clone;
    }
}
