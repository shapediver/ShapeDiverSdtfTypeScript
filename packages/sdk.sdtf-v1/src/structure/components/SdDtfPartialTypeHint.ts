import { ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialTypeHint extends SdDtfBasePartialComponent implements Partial<ISdDtfTypeHint> {

    name?: string

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.name !== undefined) json.name = this.name
        else delete json.name

        return json
    }

}
