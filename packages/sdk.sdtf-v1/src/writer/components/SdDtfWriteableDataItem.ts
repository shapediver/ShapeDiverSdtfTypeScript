import {
    ISdDtfWriteableAccessor,
    ISdDtfWriteableAttributes,
    ISdDtfWriteableDataItem,
    ISdDtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableDataItem extends SdDtfBaseWriteableComponent implements ISdDtfWriteableDataItem {

    accessor?: ISdDtfWriteableAccessor
    attributes?: ISdDtfWriteableAttributes
    typeHint?: ISdDtfWriteableTypeHint
    value?: unknown

    additionalProperties: Record<string, unknown> = {}

}
