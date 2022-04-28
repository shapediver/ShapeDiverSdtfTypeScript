import { ISdtfAsset } from "@shapediver/sdk.sdtf-core"
import { SdtfBasePartialComponent } from "./SdtfBasePartialComponent"

export class SdtfPartialAsset extends SdtfBasePartialComponent implements Partial<ISdtfAsset> {

    fileInfo?: number

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        return { ...this.additionalProperties }
    }

}
