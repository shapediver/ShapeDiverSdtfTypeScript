import { ISdtfWriteableTypeHint } from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';

export class SdtfWriteableTypeHint
    extends SdtfBaseWriteableComponent
    implements ISdtfWriteableTypeHint
{
    name?: string;

    additionalProperties: Record<string, unknown> = {};

    static clone(orig: ISdtfWriteableTypeHint): ISdtfWriteableTypeHint {
        const clone = new SdtfWriteableTypeHint();

        clone.name = orig.name;

        clone.additionalProperties = { ...orig.additionalProperties };

        return clone;
    }
}
