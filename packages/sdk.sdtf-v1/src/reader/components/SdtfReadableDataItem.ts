import {
    ISdtfReadableAccessor,
    ISdtfReadableAttributes,
    ISdtfReadableContentComponent,
    ISdtfReadableDataItem,
    ISdtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { ISdtfDataParser } from "../ISdtfDataParser"
import { SdtfBaseReadableComponent } from "./SdtfBaseReadableComponent"

export class SdtfReadableDataItem extends SdtfBaseReadableComponent implements ISdtfReadableDataItem, ISdtfReadableContentComponent {

    accessor?: ISdtfReadableAccessor
    attributes?: ISdtfReadableAttributes
    typeHint?: ISdtfReadableTypeHint
    value?: unknown

    additionalProperties: Record<string, unknown> = {}

    constructor (
        private readonly dataParser: ISdtfDataParser,
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
        return this.dataParser.parseContent(this)
    }

}
