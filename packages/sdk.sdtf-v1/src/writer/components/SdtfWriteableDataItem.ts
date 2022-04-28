import {
    ISdtfWriteableAccessor,
    ISdtfWriteableAttributes,
    ISdtfWriteableDataItem,
    ISdtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableDataItem extends SdtfBaseWriteableComponent implements ISdtfWriteableDataItem {

    accessor?: ISdtfWriteableAccessor
    attributes?: ISdtfWriteableAttributes
    typeHint?: ISdtfWriteableTypeHint
    value?: unknown

    additionalProperties: Record<string, unknown> = {}

}
