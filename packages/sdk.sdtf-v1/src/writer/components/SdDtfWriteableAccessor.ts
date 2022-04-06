import { ISdDtfWriteableBufferView } from "@shapediver/sdk.sdtf-core"
import { ISdDtfWriteableAccessor } from "@shapediver/sdk.sdtf-core/dist/writer/components/ISdDtfWriteableAccessor"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableAccessor extends SdDtfBaseWriteableComponent implements ISdDtfWriteableAccessor {

    bufferView?: ISdDtfWriteableBufferView
    id?: string

    additionalProperties: Record<string, unknown> = {}

}
