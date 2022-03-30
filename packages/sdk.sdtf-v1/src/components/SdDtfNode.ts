import { ISdDtfAttributes, ISdDtfDataItem, ISdDtfNode, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"

export class SdDtfNode implements ISdDtfNode {

    componentId: number = -1
    attributes?: ISdDtfAttributes
    items: ISdDtfDataItem[] = []
    name?: string
    nodes: ISdDtfNode[] = []
    typeHint?: ISdDtfTypeHint

    [custom: string]: unknown

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this }

        delete json.componentId

        if (this.attributes) json.attributes = this.attributes.componentId
        if (this.typeHint) json.typeHint = this.typeHint.componentId

        json.items = this.items.map(i => i.componentId)
        if (this.items.length === 0) delete json.items

        json.nodes = this.nodes.map(n => n.componentId)
        if (this.nodes.length === 0) delete json.nodes

        return json
    }

}
