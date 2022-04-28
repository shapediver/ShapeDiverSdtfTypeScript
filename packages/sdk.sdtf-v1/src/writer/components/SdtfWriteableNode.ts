import {
    ISdtfWriteableAttributes,
    ISdtfWriteableDataItem,
    ISdtfWriteableNode,
    ISdtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableNode extends SdtfBaseWriteableComponent implements ISdtfWriteableNode {

    attributes?: ISdtfWriteableAttributes
    items: ISdtfWriteableDataItem[] = []
    name?: string
    nodes: ISdtfWriteableNode[] = []
    typeHint?: ISdtfWriteableTypeHint

    additionalProperties: Record<string, unknown> = {}

}
