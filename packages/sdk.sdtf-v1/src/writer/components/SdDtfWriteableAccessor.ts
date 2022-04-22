import { ISdDtfWriteableBufferView, ISdDtfWriteableAccessor } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableAccessor extends SdDtfBaseWriteableComponent implements ISdDtfWriteableAccessor {

    bufferView?: ISdDtfWriteableBufferView
    id?: string

    additionalProperties: Record<string, unknown> = {}

}
