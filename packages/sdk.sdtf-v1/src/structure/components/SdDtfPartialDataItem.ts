import { ISdDtfDataItem } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialDataItem extends SdDtfBasePartialComponent implements Partial<ISdDtfDataItem> {

    accessor?: number
    attributes?: number
    typeHint?: number
    value?: unknown

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.accessor !== undefined) json.accessor = this.accessor
        else delete json.accessor

        if (this.attributes !== undefined) json.attributes = this.attributes
        else delete json.attributes

        if (this.typeHint !== undefined) json.typeHint = this.typeHint
        else delete json.typeHint

        if (this.value !== undefined) json.value = this.value
        else delete json.value

        return json
    }

}
