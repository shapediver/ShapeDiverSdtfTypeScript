import {
    ISdtfWriteableAccessor,
    ISdtfWriteableAttributes,
    ISdtfWriteableDataItem,
    ISdtfWriteableTypeHint,
    tryDeepCopy,
} from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"
import { SdtfWriteableAccessor } from "./SdtfWriteableAccessor"
import { SdtfWriteableAttributes } from "./SdtfWriteableAttributes"
import { SdtfWriteableTypeHint } from "./SdtfWriteableTypeHint"

export class SdtfWriteableDataItem extends SdtfBaseWriteableComponent implements ISdtfWriteableDataItem {

    accessor?: ISdtfWriteableAccessor
    attributes?: ISdtfWriteableAttributes
    typeHint?: ISdtfWriteableTypeHint
    value?: unknown

    additionalProperties: Record<string, unknown> = {}

    static clone (original: ISdtfWriteableDataItem): ISdtfWriteableDataItem {
        const clone = new SdtfWriteableDataItem()

        if (original.accessor) clone.accessor = SdtfWriteableAccessor.clone(original.accessor)
        if (original.attributes) clone.attributes = SdtfWriteableAttributes.clone(original.attributes)
        if (original.typeHint) clone.typeHint = SdtfWriteableTypeHint.clone(original.typeHint)
        clone.value = tryDeepCopy(original.value)

        clone.additionalProperties = { ...original.additionalProperties }

        return clone
    }

}
