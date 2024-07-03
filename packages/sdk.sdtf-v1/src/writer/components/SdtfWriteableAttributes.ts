import {
    ISdtfWriteableAccessor,
    ISdtfWriteableAttribute,
    ISdtfWriteableAttributes,
    ISdtfWriteableTypeHint,
    tryDeepCopy,
} from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';
import { SdtfWriteableAccessor } from './SdtfWriteableAccessor';
import { SdtfWriteableTypeHint } from './SdtfWriteableTypeHint';

export class SdtfWriteableAttributes
    extends SdtfBaseWriteableComponent
    implements ISdtfWriteableAttributes
{
    entries: Record<string, ISdtfWriteableAttribute> = {};

    /** @override */
    toDataObject(): Record<string, unknown> {
        return this.entries;
    }

    static clone(original: ISdtfWriteableAttributes): ISdtfWriteableAttributes {
        const clone = new SdtfWriteableAttributes();

        clone.entries = {};
        Object.entries(original.entries).forEach(
            ([name, attribute]) => (clone.entries[name] = SdtfWriteableAttribute.clone(attribute))
        );

        return clone;
    }
}

export class SdtfWriteableAttribute implements ISdtfWriteableAttribute {
    accessor?: ISdtfWriteableAccessor;
    typeHint?: ISdtfWriteableTypeHint;
    value?: unknown;

    static clone(original: ISdtfWriteableAttribute): ISdtfWriteableAttribute {
        const clone = new SdtfWriteableAttribute();

        if (original.accessor) clone.accessor = SdtfWriteableAccessor.clone(original.accessor);
        if (original.typeHint) clone.typeHint = SdtfWriteableTypeHint.clone(original.typeHint);
        clone.value = tryDeepCopy(original.value);

        return clone;
    }
}
