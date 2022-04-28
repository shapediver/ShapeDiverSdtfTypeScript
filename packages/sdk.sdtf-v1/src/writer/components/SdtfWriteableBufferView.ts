import { ISdtfWriteableBuffer, ISdtfWriteableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableBufferView extends SdtfBaseWriteableComponent implements ISdtfWriteableBufferView {

    buffer?: ISdtfWriteableBuffer
    byteLength?: number
    byteOffset?: number
    contentEncoding?: string
    contentType?: string
    name?: string

    additionalProperties: Record<string, unknown> = {}

}
