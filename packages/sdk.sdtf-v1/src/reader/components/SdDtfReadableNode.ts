import {
    ISdDtfReadableAttributes,
    ISdDtfReadableDataItem,
    ISdDtfReadableNode,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseReadableComponent } from "./SdDtfBaseReadableComponent"

export class SdDtfReadableNode extends SdDtfBaseReadableComponent implements ISdDtfReadableNode {

    attributes?: ISdDtfReadableAttributes
    items: ISdDtfReadableDataItem[] = []
    name?: string
    nodes: ISdDtfReadableNode[] = []
    typeHint?: ISdDtfReadableTypeHint

    additionalProperties: Record<string, unknown> = {}

}
