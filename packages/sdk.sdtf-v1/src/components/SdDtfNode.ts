import { ISdDtfAttributes, ISdDtfDataItem, ISdDtfNode, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"

export class SdDtfNode implements ISdDtfNode {

    attributes?: ISdDtfAttributes
    items: ISdDtfDataItem[] = []
    name?: string
    nodes: ISdDtfNode[] = []
    typeHint?: ISdDtfTypeHint

    [custom: string]: unknown

}
