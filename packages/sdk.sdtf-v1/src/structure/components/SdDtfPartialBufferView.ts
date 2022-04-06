import { ISdDtfBufferView } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialBufferView extends SdDtfBasePartialComponent implements Partial<ISdDtfBufferView> {

    buffer?: number
    byteLength?: number
    byteOffset?: number
    contentEncoding?: string
    contentType?: string
    name?: string

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.buffer !== undefined) json.buffer = this.buffer
        else delete json.buffer

        if (this.byteLength !== undefined) json.byteLength = this.byteLength
        else delete json.byteLength

        if (this.byteOffset !== undefined) json.byteOffset = this.byteOffset
        else delete json.byteOffset

        if (this.contentEncoding !== undefined) json.contentEncoding = this.contentEncoding
        else delete json.contentEncoding

        if (this.contentType !== undefined) json.contentType = this.contentType
        else delete json.contentType

        if (this.name !== undefined) json.name = this.name
        else delete json.name

        return json
    }

}
