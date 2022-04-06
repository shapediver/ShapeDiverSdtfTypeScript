import {
    ISdDtfWriteableAccessor,
    ISdDtfWriteableAttribute,
    ISdDtfWriteableAttributes,
    ISdDtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableAttributes extends SdDtfBaseWriteableComponent implements ISdDtfWriteableAttributes {

    entries: Record<string, ISdDtfWriteableAttribute> = {}

    /** @override */
    toDataObject (): Record<string, unknown> {
        return this.entries
    }

}

export class SdDtfWriteableAttribute implements ISdDtfWriteableAttribute {

    accessor?: ISdDtfWriteableAccessor
    typeHint?: ISdDtfWriteableTypeHint
    value?: unknown

}
