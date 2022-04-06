import {
    ISdDtfWriteableAttributes,
    ISdDtfWriteableDataItem,
    ISdDtfWriteableNode,
    ISdDtfWriteableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableNode extends SdDtfBaseWriteableComponent implements ISdDtfWriteableNode {

    attributes?: ISdDtfWriteableAttributes
    items: ISdDtfWriteableDataItem[] = []
    name?: string
    nodes: ISdDtfWriteableNode[] = []
    typeHint?: ISdDtfWriteableTypeHint

    additionalProperties: Record<string, unknown> = {}

}
