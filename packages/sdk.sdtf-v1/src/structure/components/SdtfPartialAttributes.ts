import { ISdtfAttribute, ISdtfAttributes } from "@shapediver/sdk.sdtf-core"
import { SdtfBasePartialComponent } from "./SdtfBasePartialComponent"

export class SdtfPartialAttributes extends SdtfBasePartialComponent implements ISdtfAttributes {

    entries: Record<string, ISdtfAttribute> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = {}

        Object.entries(this.entries)
            .forEach(([ name, attribute ]) => {
                json[name] = attribute.toJson!()
            })

        return json
    }

}

export class SdtfAttribute extends SdtfBasePartialComponent implements Partial<ISdtfAttribute> {

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
