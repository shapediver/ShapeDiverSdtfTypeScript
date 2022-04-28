import {
    ISdtfReadableAccessor,
    ISdtfReadableAttribute,
    ISdtfReadableAttributes,
    ISdtfReadableContentComponent,
    ISdtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { userComponentToDataObject } from "../../utils/SdtfUtils"
import { ISdtfDataParser } from "../ISdtfDataParser"
import { SdtfBaseReadableComponent } from "./SdtfBaseReadableComponent"

export class SdtfReadableAttributes extends SdtfBaseReadableComponent implements ISdtfReadableAttributes {

    entries: Record<string, ISdtfReadableAttribute> = {}

    /** @override */
    toDataObject (): Record<string, unknown> {
        const dataObject: Record<string, unknown> = {}
        Object.entries(this.entries).forEach(([ k, a ]) => dataObject[k] = a.toDataObject())
        return dataObject
    }

}

export class SdtfReadableAttribute implements ISdtfReadableAttribute, ISdtfReadableContentComponent {

    accessor?: ISdtfReadableAccessor
    typeHint?: ISdtfReadableTypeHint
    value?: unknown

    constructor (
        private readonly dataParser: ISdtfDataParser,
    ) {
    }

    toDataObject (): Record<string, unknown> {
        const dataObject = userComponentToDataObject(this)
        delete dataObject.dataParser
        return dataObject
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this)
    }

}
