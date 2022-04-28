import { ISdtfWriteableBufferView, ISdtfWriteableAccessor } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableAccessor extends SdtfBaseWriteableComponent implements ISdtfWriteableAccessor {

    bufferView?: ISdtfWriteableBufferView
    id?: string

    additionalProperties: Record<string, unknown> = {}

}
