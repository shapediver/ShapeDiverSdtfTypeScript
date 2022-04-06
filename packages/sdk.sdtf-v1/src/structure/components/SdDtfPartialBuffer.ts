import { ISdDtfBuffer } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialBuffer extends SdDtfBasePartialComponent implements Partial<ISdDtfBuffer> {

    byteLength?: number
    uri?: string

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.byteLength !== undefined) json.byteLength = this.byteLength
        else delete json.byteLength

        if (this.uri !== undefined) json.uri = this.uri
        delete json.uri

        return json
    }

}
