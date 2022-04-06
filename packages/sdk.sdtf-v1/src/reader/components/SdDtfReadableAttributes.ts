import {
    ISdDtfReadableAccessor,
    ISdDtfReadableAttribute,
    ISdDtfReadableAttributes,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { userComponentToDataObject } from "../../utils/SdDtfUtils"
import { ISdDtfDataParser } from "../ISdDtfDataParser"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableAttributes extends SdDtfReadableBaseComponent implements ISdDtfReadableAttributes {

    entries: Record<string, ISdDtfReadableAttribute> = {}

    /** @override */
    toDataObject (): Record<string, unknown> {
        const dataObject: Record<string, unknown> = {}
        Object.entries(this.entries).forEach(([ k, a ]) => dataObject[k] = a.toDataObject())
        return dataObject
    }

}

export class SdDtfReadableAttribute implements ISdDtfReadableAttribute {

    accessor?: ISdDtfReadableAccessor
    typeHint?: ISdDtfReadableTypeHint
    value?: unknown

    constructor (
        private readonly dataParser: ISdDtfDataParser,
    ) {
    }

    toDataObject (): Record<string, unknown> {
        const dataObject = userComponentToDataObject(this)
        delete dataObject.dataParser
        return dataObject
    }

    async getContent (): Promise<unknown> {
        return this.dataParser.parseContent(this.value, this.accessor, this.typeHint)
    }

}
