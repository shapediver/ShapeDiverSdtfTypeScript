import { ISdDtfAccessor } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialAccessor extends SdDtfBasePartialComponent implements Partial<ISdDtfAccessor> {

    bufferView?: number
    id?: string

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.bufferView !== undefined) json.bufferView = this.bufferView
        else delete json.bufferView

        if (this.id !== undefined) json.id = this.id
        else delete json.id

        return json
    }

}
