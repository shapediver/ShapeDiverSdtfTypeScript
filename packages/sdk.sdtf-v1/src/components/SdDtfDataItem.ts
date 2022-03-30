import { ISdDtfAccessor, ISdDtfAttributes, ISdDtfDataItem, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "../reader/ISdDtfDataParser"

export class SdDtfDataItem implements ISdDtfDataItem {

    componentId: number = -1
    accessor?: ISdDtfAccessor
    attributes?: ISdDtfAttributes
    typeHint?: ISdDtfTypeHint
    value?: unknown

    [custom: string]: unknown

    constructor (
        private readonly dataParser: ISdDtfDataParser,
    ) {
    }

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this }

        delete json.componentId
        delete json.dataParser

        if (this.accessor) json.accessor = this.accessor.componentId
        if (this.attributes) json.attributes = this.attributes.componentId
        if (this.typeHint) json.typeHint = this.typeHint.componentId

        return json
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this.value, this.accessor, this.typeHint)
    }

}
