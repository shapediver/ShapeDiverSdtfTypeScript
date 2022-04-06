import {
    ISdDtfReadableAccessor,
    ISdDtfReadableAttributes,
    ISdDtfReadableDataItem,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "../ISdDtfDataParser"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableDataItem extends SdDtfReadableBaseComponent implements ISdDtfReadableDataItem {

    accessor?: ISdDtfReadableAccessor
    attributes?: ISdDtfReadableAttributes
    typeHint?: ISdDtfReadableTypeHint
    value?: unknown

    additionalProperties: Record<string, unknown> = {}

    constructor (
        private readonly dataParser: ISdDtfDataParser,
    ) {
        super()
    }

    /** @override */
    toDataObject (): Record<string, unknown> {
        const dataObject = super.toDataObject()
        delete dataObject.dataParser
        return dataObject
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this.value, this.accessor, this.typeHint)
    }

}
