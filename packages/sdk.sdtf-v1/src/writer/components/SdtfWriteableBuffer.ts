import { ISdtfWriteableBuffer } from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';

export class SdtfWriteableBuffer
    extends SdtfBaseWriteableComponent
    implements ISdtfWriteableBuffer
{
    byteLength?: number;
    data?: ArrayBuffer;
    uri?: string;

    additionalProperties: Record<string, unknown> = {};

    static clone(orig: ISdtfWriteableBuffer): ISdtfWriteableBuffer {
        const clone = new SdtfWriteableBuffer();

        clone.byteLength = orig.byteLength;
        clone.data = orig.data; // NOTE shallow copy on purpose to reduce overall memory consumption!
        clone.uri = orig.uri;

        clone.additionalProperties = { ...orig.additionalProperties };

        return clone;
    }
}
