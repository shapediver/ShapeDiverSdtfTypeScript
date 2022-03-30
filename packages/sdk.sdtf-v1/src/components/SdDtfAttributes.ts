import { ISdDtfAccessor, ISdDtfAttribute, ISdDtfAttributes, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "../reader/ISdDtfDataParser"

export class SdDtfAttributes implements ISdDtfAttributes {

    componentId: number = -1
    items: Record<string, ISdDtfAttribute> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = {}
        Object.entries(this.items).forEach(([ n, a ]) => {
            json[n] = a.toJson()
        })
        return json
    }

}

export class SdDtfAttribute implements ISdDtfAttribute {

    accessor?: ISdDtfAccessor
    typeHint?: ISdDtfTypeHint
    value?: unknown

    constructor (
        private readonly dataParser: ISdDtfDataParser,
    ) {
    }

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = {}

        if (this.accessor) json.accessor = this.accessor.componentId
        if (this.typeHint) json.typeHint = this.typeHint.componentId
        if (this.value) json.value = this.value

        return json
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this.value, this.accessor, this.typeHint)
    }

}
