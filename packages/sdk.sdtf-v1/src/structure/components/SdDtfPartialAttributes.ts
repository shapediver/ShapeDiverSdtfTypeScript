import { ISdDtfAttribute, ISdDtfAttributes } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialAttributes extends SdDtfBasePartialComponent implements ISdDtfAttributes {

    entries: Record<string, ISdDtfAttribute> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = {}

        Object.entries(this.entries)
            .forEach(([ name, attribute ]) => {
                json[name] = attribute.toJson!()
            })

        return json
    }

}

export class SdDtfAttribute extends SdDtfBasePartialComponent implements Partial<ISdDtfAttribute> {

    accessor?: number
    typeHint?: number
    value?: unknown

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = {}

        if (this.accessor !== undefined) json.accessor = this.accessor
        if (this.typeHint !== undefined) json.typeHint = this.typeHint
        if (this.value !== undefined) json.value = this.value

        return json
    }

}
