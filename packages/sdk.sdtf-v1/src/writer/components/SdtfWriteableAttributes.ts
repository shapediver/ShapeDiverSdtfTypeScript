import {
    ISdtfWriteableAccessor,
    ISdtfWriteableAttribute,
    ISdtfWriteableAttributes,
    ISdtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableAttributes extends SdtfBaseWriteableComponent implements ISdtfWriteableAttributes {

    entries: Record<string, ISdtfWriteableAttribute> = {}

    /** @override */
    toDataObject (): Record<string, unknown> {
        return this.entries
    }

}

export class SdtfWriteableAttribute implements ISdtfWriteableAttribute {

    accessor?: ISdtfWriteableAccessor
    typeHint?: ISdtfWriteableTypeHint
    value?: unknown

}
