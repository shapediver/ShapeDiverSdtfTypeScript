import { ISdDtfFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialFileInfo extends SdDtfBasePartialComponent implements Partial<ISdDtfFileInfo> {

    copyright?: string
    generator?: string
    version?: string

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties }

        if (this.copyright !== undefined) json.copyright = this.copyright
        else delete json.copyright

        if (this.generator !== undefined) json.generator = this.generator
        else delete json.generator

        if (this.version !== undefined) json.version = this.version
        else delete json.version

        return json
    }

}
