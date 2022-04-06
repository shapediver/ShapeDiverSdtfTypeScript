import {
    ISdDtfReadableAttributes,
    ISdDtfReadableDataItem,
    ISdDtfReadableNode,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableNode extends SdDtfReadableBaseComponent implements ISdDtfReadableNode {

    attributes?: ISdDtfReadableAttributes
    items: ISdDtfReadableDataItem[] = []
    name?: string
    nodes: ISdDtfReadableNode[] = []
    typeHint?: ISdDtfReadableTypeHint

    additionalProperties: Record<string, unknown> = {}

}
