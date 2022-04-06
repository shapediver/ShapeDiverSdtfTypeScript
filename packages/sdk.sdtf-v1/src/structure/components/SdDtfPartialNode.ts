import { ISdDtfNode } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialNode extends SdDtfBasePartialComponent implements ISdDtfNode {

    attributes?: number
    items: number[] = []
    name?: string
    nodes: number[] = []
    typeHint?: number

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.attributes !== undefined) json.attributes = this.attributes
        else delete json.attributes

        if (this.items.length > 0) json.items = this.items
        else delete json.items

        if (this.name !== undefined) json.name = this.name
        else delete json.name

        if (this.nodes.length > 0) json.nodes = this.nodes
        else delete json.nodes

        if (this.typeHint !== undefined) json.typeHint = this.typeHint
        else delete json.typeHint

        return json
    }

}
