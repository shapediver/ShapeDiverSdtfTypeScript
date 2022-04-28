import { ISdtfWriteableTypeHint } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableTypeHint extends SdtfBaseWriteableComponent implements ISdtfWriteableTypeHint {

    name?: string

    additionalProperties: Record<string, unknown> = {}

}
