import { ISdDtfAsset } from "@shapediver/sdk.sdtf-core"
import { SdDtfBasePartialComponent } from "./SdDtfBasePartialComponent"

export class SdDtfPartialAsset extends SdDtfBasePartialComponent implements Partial<ISdDtfAsset> {

    fileInfo?: number

    additionalProperties: Record<string, unknown> = {}

    toJson (): Record<string, unknown> {
        return { ...this.additionalProperties }
    }

}
