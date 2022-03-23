import { ISdDtfAccessor, ISdDtfAttribute, ISdDtfAttributes, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"

export class SdDtfAttributes implements ISdDtfAttributes {

    [name: string]: ISdDtfAttribute

}

export class SdDtfAttribute implements ISdDtfAttribute {

    accessor?: ISdDtfAccessor
    typeHint?: ISdDtfTypeHint
    value?: unknown

    async getContent (): Promise<unknown> {
        if (this.value !== undefined) return this.value // Value precedes
        if (this.accessor) return this.accessor.getContent()
        return undefined    // No value and no accessor
    }

}
