import { ISdDtfAccessor, ISdDtfAttributes, ISdDtfDataItem, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "../reader/ISdDtfDataParser"

export class SdDtfDataItem implements ISdDtfDataItem {

    accessor?: ISdDtfAccessor
    attributes?: ISdDtfAttributes
    typeHint?: ISdDtfTypeHint
    value?: unknown

    [custom: string]: unknown

    constructor (
        private readonly dataParser: ISdDtfDataParser,
    ) {
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this.value, this.accessor, this.typeHint)
    }

}
