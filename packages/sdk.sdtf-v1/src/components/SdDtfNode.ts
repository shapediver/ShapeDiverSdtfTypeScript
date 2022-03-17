import { ISdDtfAttributes } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAttributes"
import { ISdDtfDataItem } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfDataItem"
import { ISdDtfNode } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfNode"
import { ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfTypeHint"

export class SdDtfNode implements ISdDtfNode {

    attributes?: ISdDtfAttributes
    items: ISdDtfDataItem[] = []
    name?: string
    nodes: ISdDtfNode[] = []
    typeHint?: ISdDtfTypeHint
    [custom: string]: unknown

}
