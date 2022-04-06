import { ISdDtfWriteableTypeHint } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableTypeHint extends SdDtfBaseWriteableComponent implements ISdDtfWriteableTypeHint {

    name?: string

    additionalProperties: Record<string, unknown> = {}

}
