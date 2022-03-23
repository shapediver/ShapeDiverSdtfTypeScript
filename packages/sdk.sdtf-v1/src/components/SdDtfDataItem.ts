import { ISdDtfAccessor, ISdDtfAttributes, ISdDtfDataItem, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"

export class SdDtfDataItem implements ISdDtfDataItem {

    accessor?: ISdDtfAccessor
    attributes?: ISdDtfAttributes
    typeHint?: ISdDtfTypeHint
    value?: unknown

    [custom: string]: unknown

    async getContent (): Promise<unknown> {
        if (this.value !== undefined) return this.value // Value precedes
        if (this.accessor) return this.accessor.getContent()
        return undefined    // No value and no accessor
    }

}
