import { ISdDtfAccessor, ISdDtfAttribute, ISdDtfAttributes, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "../reader/ISdDtfDataParser"

export class SdDtfAttributes implements ISdDtfAttributes {

    [name: string]: ISdDtfAttribute

}

export class SdDtfAttribute implements ISdDtfAttribute {

    accessor?: ISdDtfAccessor
    typeHint?: ISdDtfTypeHint
    value?: unknown

    constructor (
        private readonly dataParser: ISdDtfDataParser,
    ) {
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this.value, this.accessor, this.typeHint)
    }

}
